"use client";
import { useState } from "react";
import ProductCart from "../card/ProductCart";
import { useSession } from "next-auth/react";
import { ShowToast } from "@/app/lib/utils/successalert";

export default function ProductCollection(props) {
  const limit = props.limit;
  const { data } = props;

  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState(session?.user?.carts || []);

  let disabledCart = status === "authenticated" ? true : false;

  function addCart(data, qty = 1) {
    if (qty > data.stock) {
      ShowToast("error", "stock tidak mencukupi");
      return;
    }

    setLoading(true);

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
        ShowToast("error", "stock tidak mencukupi");
        setLoading(false);
        return;
      }
      carts[existingCartIndex].qty = newQty;
    } else {
      carts.push(cart);
    }

    update({ user: { ...session.user, carts: [...carts] } }); // Update the session object with the new carts array
    setCarts([...carts]); // Update the state variable with the new carts array
    ShowToast("success", "Berhasil ditambahkan ke keranjang");
    setLoading(false);
  }

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
            ? data.map((item, index) => {
                if (index < limit) {
                  // return <Productcard key={item.id} data={item} />;
                  return (
                    <ProductCart
                      key={index}
                      data={item}
                      disabledCart={disabledCart}
                      loading={loading}
                      addCart={addCart}
                    />
                  );
                }
              })
            : data.map((item, index) => {
                return (
                  <ProductCart
                    key={index}
                    data={item}
                    disabledCart={disabledCart}
                    loading={loading}
                    addCart={addCart}
                  />
                );
              })}
        </ul>
      </div>

      {carts.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.qty}</p>
        </div>
      ))}
    </section>
  );
}
