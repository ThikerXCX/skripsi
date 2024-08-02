import { sendMessage } from "@/app/lib/helper";
import { ShowToast } from "@/app/lib/utils/successalert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Swal from "sweetalert2";

export default function ButtonService({ row }) {
  const updateData = async (data) => {
    const response = await fetch(`/api/service`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };
  const handlePengerjaan = async (rowData) => {
    rowData.status.push("Dalam Tahap Pengerjaan");
    rowData.statusCode = 2;
    const response = await updateData(rowData);
    if (response.status === 200) {
      ShowToast("success", "status berhasil di update");
      window.location.reload();
    } else {
      ShowToast("error", "ada masalah");
    }
  };
  const handleCancel = async (rowData) => {
    rowData.status.push("Cancel");
    rowData.statusCode = 3;
    const response = await updateData(rowData);
    if (response.status === 200) {
      ShowToast("success", "status berhasil di update");
      window.location.reload();
    } else {
      ShowToast("error", "ada masalah");
    }
  };
  const handleSetuju = async (rowData) => {
    rowData.status.push("Perbaikan Dilanjutkan");
    rowData.statusCode = 4;
    const response = await updateData(rowData);
    if (response.status === 200) {
      ShowToast("success", "status berhasil di update");
      window.location.reload();
    } else {
      ShowToast("error", "ada masalah");
    }
  };
  const handleSelesai = async (rowData) => {
    rowData.status.push("Perbaikan Telah Selesai");
    rowData.statusCode = 5;
    const response = await updateData(rowData);
    await sendMessage(rowData, "feedback");
    if (response.status === 200) {
      ShowToast("success", "status berhasil di update");
      window.location.reload();
    } else {
      ShowToast("error", "ada masalah");
    }
  };
  const handleKonfirmasi = async (rowData) => {
    Swal.fire({
      title: "Konfirmasi Biaya",
      html: `
        <form class="space-y-4">
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700">Biaya</label>
            <div class="relative mt-1">
              <input type="number" id="biaya" class="block w-full py-2 pl-3 pr-10 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:z-10 sm:text-sm" placeholder="Masukkan biaya">
            </div>
          </div>
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700">Keterangan</label>
            <div class="relative mt-1">
              <textarea id="keterangan" class="block w-full py-2 pl-3 pr-10 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:z-10 sm:text-sm" rows="5" placeholder="Masukkan keterangan"></textarea>
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
        const biaya = document.getElementById("biaya").value;
        const keterangan = document.getElementById("keterangan").value;
        if (biaya === "" || keterangan === "") {
          Swal.showValidationMessage("Harap isi semua field");
          return false;
        }
        return { biaya, keterangan };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { biaya, keterangan } = result.value;
        rowData.status.push("Menunggu Konfirmasi Pelanggan");
        rowData.biaya = biaya;
        rowData.keterangan = keterangan;
        const response = await updateData(rowData);
        await sendMessage(rowData, "konfirmasi");
        if (response.status === 200) {
          ShowToast("success", "status berhasil di update");
          window.location.reload();
        } else {
          ShowToast("error", "ada masalah");
        }
      }
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            handlePengerjaan(row.original);
          }}
        >
          Pengerjaan
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            handleKonfirmasi(row.original);
          }}
        >
          Konfirmasi
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            handleCancel(row.original);
          }}
        >
          Cancel
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            handleSetuju(row.original);
          }}
        >
          Setuju
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            handleSelesai(row.original);
          }}
        >
          Selesai
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
