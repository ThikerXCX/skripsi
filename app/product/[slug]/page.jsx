"use client";
import Footer from "@/app/components/layouts/Footer";
import DetailProduct from "@/app/components/product/DetailProduct";
import { retriveDataBySlug } from "@/app/lib/firebase/service";
import { ShowToast } from "@/app/lib/utils/successalert";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import CSS untuk Carousel

export default function DetailProductPage(props) {
  const { params } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, update } = useSession();
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const product = await retriveDataBySlug("products", params.slug);
        setData(product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (session?.user) {
      setCarts(session.user.carts);
    }

    getData();
  }, [params, session]);

  const addToSessionCart = async (data, qty = 1) => {
    if (qty > data.stock) {
      return false;
    }
    let cart = {
      product_id: data.id,
      name: data.name,
      price: data.harga,
      qty: qty,
    };

    const existingCartIndex = carts.findIndex(
      (item) => item.product_id === data.id
    );

    if (existingCartIndex !== -1) {
      const currentQty = carts[existingCartIndex].qty;
      const newQty = currentQty + qty;
      if (newQty > data.stock) {
        return false;
      }
      carts[existingCartIndex].qty = newQty;
    } else {
      carts.push(cart);
    }

    setCarts([...carts]);

    await update({
      carts: carts,
    });
    return true; // Update the state variable with the new carts array
  };

  const addCart = async (data, qty) => {
    setLoading(true);
    const updatedCart = await addToSessionCart(data, qty);

    if (updatedCart) {
      const res = await fetch(`/api/user/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          carts: carts,
        }),
      });
      if (res.status) {
        ShowToast("success", "Berhasil ditambahkan ke keranjang");
        setLoading(false);
      } else {
        ShowToast("error", "gagal dalam memasukan ke keranjang");
        setLoading(false);
      }
    } else {
      ShowToast("error", "stock tidak mencukupi");
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="grid flex-grow d-block p-4 grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <DetailProduct data={data} addCart={addCart} />
          <div className=" rounded-lg bg-gray-200 lg:col-span-2 overflow-auto">
            <div className="max-h-screen">
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                useKeyboardArrows
              >
                {data.image.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={image.url}
                      alt={image.ref}
                      width={500}
                      height={500}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
        <Footer className="mt-auto" />
      </div>
    </>
  );
}
