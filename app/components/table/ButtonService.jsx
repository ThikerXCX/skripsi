import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function ButtonService({ row }) {
  const handleClick = async (rowData) => {
    const res = await fetch(`/api/service/konfirmasi`, {
      method: "PUT",
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
  };
  return <Button onClick={() => handleClick(row.original)}>Konfirmasi</Button>;
}
