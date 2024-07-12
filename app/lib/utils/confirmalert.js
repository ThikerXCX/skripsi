import Swal from "sweetalert2";

export const ConfirmAlert = async () => {
  const result = await Swal.fire({
    title: "Yakin mau Hapus?",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Tidak",
  });

  return result.isConfirmed;
};
