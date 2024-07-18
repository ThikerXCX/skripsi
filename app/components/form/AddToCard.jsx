// "use client";

// import { ShowToast } from "@/app/lib/utils/successalert";
// import { useSession } from "next-auth/react";
// import { useState } from "react";

// export default function AddToCard(props) {
//   const product = props.data;
//   const { data: session, status, update } = useSession();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null); // add an error state

//   let carts = session?.user.carts;

//   function addCart(qty = 1) {
//     if (qty > product.stock) {
//       setError("stock product tidak mencukupi"); // set error message
//       return;
//     }

//     setLoading(true);
//     let cart = {
//       product_id: product.id,
//       name: product.name,
//       price: product.harga,
//       qty: qty,
//     };

//     const existingCartIndex = carts.findIndex(
//       (item) => item.product_id === product.id
//     );

//     if (existingCartIndex !== -1) {
//       const currentQty = carts[existingCartIndex].qty;
//       const newQty = currentQty + qty;
//       if (newQty > product.stock) {
//         setError("stock product tidak mencukupi"); // set error message
//         setLoading(false);
//         return;
//       }
//       carts[existingCartIndex].qty = newQty;
//     } else {
//       carts.push(cart);
//     }

//     update({ user: { ...session.user, carts } });
//     ShowToast("success", "berhasil ditambahkan ke keranjang");
//     setLoading(false);
//     setError(null); // clear error message
//   }

//   if (status === "authenticated") {
//     return (
//       <div>
//         <button
//           onClick={addCart}
//           disabled={loading}
//           className="block w-full rounded bg-yellow-400 p-2 text-sm font-medium transition hover:scale-105"
//         >
//           Tambah Keranjang
//         </button>
//         {error && <div style={{ color: "red" }}>{error}</div>}{" "}
//         {/* display error message */}
//       </div>
//     );
//   }
// }

"use client";

import { ShowToast } from "@/app/lib/utils/successalert";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AddToCart(props) {
  const product = props.data;
  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let carts = session?.user?.carts || [];

  function addCart(qty = 1) {
    setError(null);

    if (qty > product.stock) {
      setError(`Quantity cannot exceed ${product.stock} in stock`);
      return;
    }

    setLoading(true);

    let cart = {
      product_id: product.id,
      name: product.name,
      price: product.harga,
      qty: qty,
    };

    const existingCartIndex = carts.findIndex(
      (item) => item.product_id === product.id
    );

    if (existingCartIndex !== -1) {
      const currentQty = carts[existingCartIndex].qty;
      const newQty = currentQty + qty;
      if (newQty > product.stock) {
        setError(`Quantity cannot exceed ${product.stock} in stock`);
        setLoading(false);
        return;
      }
      carts[existingCartIndex].qty = newQty;
    } else {
      carts.push(cart);
    }

    update({ user: { ...session.user, carts } });
    ShowToast("success", "Berhasil ditambahkan ke keranjang");
    setLoading(false);
  }

  if (status === "authenticated") {
    return (
      <div>
        <button
          onClick={() => addCart(1)}
          disabled={loading}
          className="block w-full rounded bg-yellow-400 p-2 text-sm font-medium transition hover:scale-105"
        >
          Tambah Keranjang
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {carts.map((item) => ({}))}
      </div>
    );
  }

  return null; // Handle case when status is not "authenticated"
}
