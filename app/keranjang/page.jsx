"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { formatRupiah, Slugify } from "../lib/helper";
import Link from "next/link";
import { debounce } from "lodash";
import { getDataProdukUser } from "../services/products";
import { ShowToast } from "../lib/utils/successalert";

export default function KeranjangPage() {
  const { data: session, update } = useSession();
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getDataProdukUser("/api/product/user");

      // Update carts with stock values
      const updatedCarts = session?.user.carts.map((cart) => {
        const productMatch = data.find((prod) => prod.id === cart.product_id);
        if (productMatch) {
          return {
            ...cart,
            stock: productMatch.stock,
            berat: productMatch.stock,
          };
        }
        return cart;
      });
      setCarts(updatedCarts);
    };

    fetchData();
  }, [session]);

  const updateCartsToFirebase = async (updatedCarts) => {
    const cartsWithoutStock = updatedCarts.map((cart) => {
      const { stock, ...cartWithoutStock } = cart;
      return cartWithoutStock;
    });

    await update({ carts: updatedCarts });

    const res = await fetch(`/api/user/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
        carts: cartsWithoutStock,
      }),
    });

    if (res.status === 200) {
      ShowToast("success", "Berhasil mengupdate keranjang");
    } else {
      ShowToast("error", "Gagal mengupdate keranjang");
    }
  };

  const handleQuantityChange = debounce((index, quantity) => {
    setCarts((prevCarts) => {
      const newCarts = prevCarts.map((cart, i) =>
        i === index ? { ...cart, qty: quantity } : cart
      );
      updateCartsToFirebase(newCarts);
      return newCarts;
    });
  }, 500);

  const handleDelete = (index) => {
    setCarts((prevCarts) => {
      const newCarts = prevCarts.filter((_, i) => i !== index);
      updateCartsToFirebase(newCarts);
      return newCarts;
    });
  };

  const totalHarga =
    carts && carts.length > 0
      ? carts.reduce((total, cart) => total + cart.harga * cart.qty, 0)
      : 0;

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Keranjang Belanja</h1>
      <table className="w-full table-auto bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2">Nama Produk</th>
            <th className="px-4 py-2">Harga</th>
            <th className="px-4 py-2">Jumlah</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {carts &&
            carts.map((cart, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="px-4 py-2">
                  <Link href={`/product/${Slugify(cart.name)}`}>
                    {cart.name}
                  </Link>
                </td>
                <td className="px-4 py-2">{formatRupiah(cart.harga)}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={cart.qty}
                    max={cart.stock}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value, 10))
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-orange-200"
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" className="px-4 py-2 text-right font-bold">
              Total Harga:
            </td>
            <td colSpan="2" className="px-4 py-2 text-left font-bold">
              {formatRupiah(totalHarga)}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="flex justify-end mt-6">
        <Link
          href="/checkout"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
