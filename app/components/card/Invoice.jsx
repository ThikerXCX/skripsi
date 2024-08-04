// "use client";

// import { formatRupiah } from "@/app/lib/helper"; // Pastikan ini sudah benar di path
// import moment from "moment";
// import "moment/locale/id";
// moment.locale("id");

// export default function InvoiceComponent({ invoiceData }) {
//   const { id, name, penerima, item_details, created_at, total_harga } =
//     invoiceData;

//   return (
//     <div className="max-w-5xl mx-auto p-8 bg-white printable shadow-md rounded-lg">
//       <h1 className="text-3xl font-bold mb-6">Invoice</h1>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Detail Customer</h2>
//         <p>Nama: {name}</p>
//         <p>Nomor HP: {penerima.no_hp_penerima}</p>
//         <p>Alamat: {penerima.alamat_lengkap}</p>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Detail Invoice</h2>
//         <p>Invoice ID: {id}</p>
//         <p>Tanggal: {moment.unix(created_at.seconds).format("L")}</p>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Items</h2>
//         <table className="min-w-full bg-white border">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border">Nama Barang</th>
//               <th className="py-2 px-4 border">Jumlah</th>
//               <th className="py-2 px-4 border">Harga</th>
//               <th className="py-2 px-4 border">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {item_details.map((item, index) => (
//               <tr key={index}>
//                 <td className="py-2 px-4 border">{item.name}</td>
//                 <td className="py-2 px-4 border">{item.qty}</td>
//                 <td className="py-2 px-4 border">{formatRupiah(item.harga)}</td>
//                 <td className="py-2 px-4 border">
//                   {formatRupiah(item.harga * item.qty)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="text-right">
//         <h2 className="text-xl font-semibold">
//           Total Harga: {formatRupiah(total_harga)}
//         </h2>
//       </div>

//       <div className="mt-6 flex justify-end">
//         <button
//           onClick={() => window.print()}
//           className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
//         >
//           Print
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { formatRupiah } from "@/app/lib/helper"; // Pastikan path ini benar
import moment from "moment";
import "moment/locale/id";
moment.locale("id");

export default function InvoiceComponent({ invoiceData }) {
  const { id, name, penerima, item_details, created_at, total_harga } =
    invoiceData;
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <style>
        {`
          @media print {
            .print-area {
              display: block;
            }
            .non-printable {
              display: none;
            }
            .printable {
              display: block;
            }
          }
        `}
      </style>
      <div
        ref={componentRef}
        className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg"
      >
        <h1 className="text-3xl font-bold mb-6">Invoice</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Detail Customer</h2>
          <p>Nama: {name}</p>
          <p>Nomor HP: {penerima.no_hp_penerima}</p>
          <p>Alamat: {penerima.alamat_lengkap}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Detail Invoice</h2>
          <p>Invoice ID: {id}</p>
          <p>Tanggal: {moment.unix(created_at.seconds).format("L")}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Items</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Nama Barang</th>
                <th className="py-2 px-4 border">Jumlah</th>
                <th className="py-2 px-4 border">Harga</th>
                <th className="py-2 px-4 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {item_details.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border">{item.name}</td>
                  <td className="py-2 px-4 border">{item.qty}</td>
                  <td className="py-2 px-4 border">
                    {formatRupiah(item.harga)}
                  </td>
                  <td className="py-2 px-4 border">
                    {formatRupiah(item.harga * item.qty)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-right">
          <h2 className="text-xl font-semibold">
            Total Harga: {formatRupiah(total_harga)}
          </h2>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Print
        </button>
      </div>
    </div>
  );
}
