"use client";
import { useSession } from "next-auth/react";

export default function AddToCart(props) {
  console.log(props);
  const product = props.data;
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <div key={product.id}>
        <button
          onClick={() => addCart(1)}
          // disabled={loading}
          className="block w-full rounded bg-yellow-400 p-2 text-sm font-medium transition hover:scale-105"
        >
          Tambah Keranjang
        </button>
      </div>
    );
  }

  return null; // Handle case when status is not "authenticated"
}
