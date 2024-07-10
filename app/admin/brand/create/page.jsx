"use client";

import { Slugify } from "@/app/lib/helper";
import { useState } from "react";
import Swal from "sweetalert2";

export default function TambahKategoriPage() {
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const slugfy = (e) => {
    let nama = e.target.value;
    let slug = Slugify(nama);
    setSlug(slug);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const res = await fetch(`/api/brand`, {
      method: "POST",
      body: JSON.stringify({
        name: e.target.name.value,
        slug: slug,
      }),
    });
    console.log(await res.json());

    if (res.status === 200) {
      // Tampilkan SweetAlert sukses
      Swal.fire({
        icon: "success",
        title: "Data berhasil dimasukkan!",
        showConfirmButton: false,
        timer: 2000, // Durasi tampilan alert dalam milidetik (opsional)
      }).then(() => {
        // Redirect setelah SweetAlert ditutup
        window.location.href = "/admin/brand";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menambahkan data",
        confirmButtonText: "OK",
      });
      setError("gagal memasukan data");
      setIsLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-6 shadow-xl rounded-lg bg-gray-50">
      <h1 className="font-bold text-2xl text-center text-blue-700 mb-6">
        Tambah Brand
      </h1>
      <form onSubmit={submitHandler} className="mt-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Nama Brand
            </label>
            <input
              onChange={slugfy}
              type="text"
              name="name"
              id="name"
              required
              className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            />
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Slug Brand
            </label>
            <input
              type="text"
              name="slug"
              id="slug"
              disabled
              value={slug}
              className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-block px-6 py-2 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            Tambah Brand
          </button>
        </div>
      </form>
    </div>
  );
}
