"use client";
import { ConfirmAlert } from "@/app/lib/utils/confirmalert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function DropDownMenuAksi({ row, route }) {
  const router = useRouter();

  const handleEdit = (rowData) => {
    router.push(`/admin/${route}/edit/${rowData.id}`);
  };

  const handleDelete = async (rowData) => {
    let isConfirm = await ConfirmAlert();
    if (isConfirm) {
      const res = await fetch(`/api/${route}`, {
        method: "DELETE",
        body: JSON.stringify(rowData),
      });
      if (res.status === 200) {
        // Tampilkan SweetAlert sukses
        Swal.fire({
          icon: "success",
          title: "Data berhasil dihapus!",
          showConfirmButton: false,
          timer: 2000, // Durasi tampilan alert dalam milidetik (opsional)
        }).then(() => {
          // Redirect setelah SweetAlert ditutup
          window.location.href = `/admin/${route}`;
        });
      } else {
        Swal.fire({
          title: "Error",
          text: res.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            handleEdit(row.original);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            handleDelete(row.original);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
