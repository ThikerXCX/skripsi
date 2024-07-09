"use client";
import { Slugify } from "@/app/lib/helper";
import { getDataKategoriById } from "@/app/services/kategori";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function page(props) {
  const { params } = props;
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getDataKategoriById(`/api/kategori?id=` + params.id);
        setId(data.data.id);
        setName(data.data.name);
        setSlug(data.data.slug);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const slugify = (e) => {
    setName(e.target.value);
    setSlug(Slugify(name));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const res = await fetch(`/api/kategori`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        name: name,
        slug: slug,
      }),
    });

    if (res.status === 200) {
      // Tampilkan SweetAlert sukses
      Swal.fire({
        icon: "success",
        title: "Data berhasil diupdate!",
        showConfirmButton: false,
        timer: 2000, // Durasi tampilan alert dalam milidetik (opsional)
      }).then(() => {
        // Redirect setelah SweetAlert ditutup
        window.location.href = "/admin/kategori";
      });
    } else {
      console.log(res);
      setError("gagal memasukan data");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 shadow-xl rounded-lg bg-gray-50">
      <h1 className="font-bold text-2xl text-center text-blue-700 mb-6">
        Update Kategori
      </h1>
      <form onSubmit={submitHandler} className="mt-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="hidden" value={id} />
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Nama Kategori
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={slugify}
              value={name}
              className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            />
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Slug Kategori
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
            Update kategori
          </button>
        </div>
      </form>
    </div>
  );
}
