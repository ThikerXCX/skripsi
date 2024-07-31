"use client";
import { useEffect, useState } from "react";
import ProductCart from "../card/ProductCart";
import { useSession } from "next-auth/react";
import { ShowToast } from "@/app/lib/utils/successalert";

export default function ProductCollection(props) {
  const limit = props.limit;
  const { data } = props;

  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    if (session?.user) {
      setCarts(session?.user.carts || []);
    }
  }, [session]);
  let disabledCart = status === "authenticated" ? true : false;

  const addToSessionCart = async (data, qty = 1) => {
    if (qty > data.stock) {
      return false;
    }
    let cart = {
      product_id: data.id,
      name: data.name,
      harga: data.harga,
      berat: data.berat,
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

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Koleksi Laptop
          </h2>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {limit
            ? data.map((item) => (
                <ProductCart
                  key={item.id} // Use the item's id as the key prop
                  data={item}
                  disabledCart={disabledCart}
                  loading={loading}
                  addCart={addCart}
                />
              ))
            : data.map((item) => (
                <ProductCart
                  key={item.id} // Use the item's id as the key prop
                  data={item}
                  disabledCart={disabledCart}
                  loading={loading}
                  addCart={addCart}
                />
              ))}
        </ul>
      </div>
    </section>
  );
}
