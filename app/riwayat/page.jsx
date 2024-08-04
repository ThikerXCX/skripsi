"use client";
import { useSession } from "next-auth/react";
import { getUserTransaction } from "../services/transaksi";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShowToast } from "../lib/utils/successalert";

export default function RiwayatTransaksiPage() {
  const { data: session } = useSession();
  const [transaksi, setTransaksi] = useState([]);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (session && session.user && session.user.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        const trans = await getUserTransaction(email);
        setTransaksi(trans.data);
      };
      fetchData();
    }
  }, [email]);

  const handleTerima = async (datas) => {
    datas.status_pengiriman.push("Barang telah diterima");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}api/transaksi`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: datas.id,
          status_pengiriman: datas.status_pengiriman,
          statusCode: 3,
        }),
      }
    );

    const response = await res.json();
    if (response.status === 200) {
      window.location.reload();
      ShowToast("success", "Data berhasil diupdate");
    } else {
      ShowToast("error", "Data gagal diupdate");
    }
  };

  return (
    <div className="container p-4 mt-2">
      <h1 className="font-bold font-serif text-2xl">Riwayat Transaksi</h1>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">No</th>
              <th className="py-2 px-4 border-b">ID Transaksi</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Kode Pengiriman</th>
              <th className="py-2 px-4 border-b">Tanggal</th>
              <th className="py-2 px-4 border-b">Total Harga</th>
              <th className="py-2 px-4 border-b">Detail Barang</th>
              <th className="py-2 px-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((trans, index) => (
              <tr key={trans.id}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 truncate px-4 border-b">
                  {trans.id.substring(0, 8)}...
                </td>
                <td className="py-2 px-4 border-b">
                  {trans.statusCode == 1
                    ? "Barang sedang dikemas"
                    : trans.statusCode == 2
                    ? "Barang dalam pengiriman"
                    : "Barang telah diterima"}
                </td>
                <td className="py-2 px-4 border-b">{trans.kode_pengiriman}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(
                    trans.created_at.seconds * 1000
                  ).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  Rp {trans.total_harga.toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {trans.item_details.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <p>
                        {item.name} (Qty: {item.qty}) - Rp{" "}
                        {parseInt(item.harga).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </td>
                <td className="flex justify-between items-center m-2">
                  {trans.statusCode === 2 ? (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleTerima(trans)}
                    >
                      Diterima
                    </button>
                  ) : (
                    ""
                  )}
                  <Link
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                    href={`/riwayat/invoice/${trans.id}`}
                  >
                    Invoice
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
