// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreHorizontal } from "lucide-react";
// import Swal from "sweetalert2";
// export default function ButtonTransaksi({ row }) {
//   const updateData = async (data) => {
//     const response = await fetch(`/api/transaksi`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     return await response.json();
//   };

//   const handleKirim = async (rowData) => {
//     Swal.fire({
//       title: "Pengiriman Barang",
//       html: `
//         <form class="space-y-4">
//           <div class="form-group">
//             <label class="block text-sm font-medium text-gray-700">Kode Pengiriman</label>
//             <div class="relative mt-1">
//               <input type="text" id="kode_pengiriman" class="block w-full py-2 pl-3 pr-10 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:z-10 sm:text-sm" placeholder="Masukkan biaya">
//             </div>
//           </div>

//         </form>
//       `,
//       showCancelButton: true,
//       confirmButtonText: "Simpan",
//       cancelButtonText: "Batal",
//       customClass: {
//         popup: "p-6 bg-white rounded-lg shadow-lg",
//         confirmButton:
//           "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
//         cancelButton:
//           "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-3",
//       },
//       preConfirm: () => {
//         const kode_pengiriman =
//           document.getElementById("kode_pengiriman").value;
//         if (kode_pengiriman === "") {
//           Swal.showValidationMessage("Harap isi Masukan Kode Pengiriman");
//           return false;
//         }
//         return { kode_pengiriman };
//       },
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const { kode_pengiriman } = result.value;
//         rowData.kode_pengiriman = kode_pengiriman;
//         rowData.statusCode = 2;
//         rowData.status_pengiriman.push("Barang Telah dikirim");
//         const response = await updateData(rowData);
//         if (response.status === 200) {
//           ShowToast("success", "status berhasil di update");
//           window.location.reload();
//         } else {
//           ShowToast("error", "ada masalah");
//         }
//       }
//     });
//   };
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger>
//         <MoreHorizontal className="h-4 w-4" />
//       </DropdownMenuTrigger>
//       <DropdownMenuContent>
//         {
//             row.original.statusCode == 1 ?
//         }
//         <DropdownMenuSeparator />
//         <DropdownMenuItem
//           onClick={() => {
//             handleHapus(row.original);
//           }}
//         >
//           Hapus
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

const ButtonTransaksi = ({ row }) => {
  const updateData = async (data) => {
    try {
      const response = await fetch(`/api/transaksi`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKirim = async (rowData) => {
    try {
      const { value: kodePengiriman } = await Swal.fire({
        title: "Pengiriman Barang",
        html: `
            <form class="space-y-4">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700">Kode Pengiriman</label>
                <div class="relative mt-1">
                  <input type="text" id="kode_pengiriman" class="block w-full py-2 pl-3 pr-10 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:z-10 sm:text-sm" placeholder="Masukkan biaya">
                </div>
              </div>
            </form>
          `,
        showCancelButton: true,
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal",
        customClass: {
          popup: "p-6 bg-white rounded-lg shadow-lg",
          confirmButton:
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
          cancelButton:
            "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-3",
        },
        preConfirm: () => {
          const kodePengiriman =
            document.getElementById("kode_pengiriman").value;
          if (kodePengiriman === "") {
            Swal.showValidationMessage("Harap isi Masukan Kode Pengiriman");
            return false;
          }
          return { kodePengiriman };
        },
      });

      if (kodePengiriman) {
        rowData.kode_pengiriman = kodePengiriman;
        rowData.statusCode = 2;
        rowData.status_pengiriman.push("Barang Telah dikirim");
        const response = await updateData(rowData);
        if (response.status === 200) {
          window.location.reload();
        } else {
          console.log("ada masalah");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {row.original.statusCode === 1 && (
          <DropdownMenuItem onClick={() => handleKirim(row.original)}>
            Kirim Barang
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/riwayat/invoice/${row.original.id}`}>Invoice</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleHapus(row.original)}>
          Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ButtonTransaksi;
