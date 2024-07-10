"use client";

import { Slugify } from "@/app/lib/helper";
import { getDataBrand } from "@/app/services/brand";
import { getDataKategori } from "@/app/services/kategori";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";

export default function TambahProdukPage() {
  const [kategori, setKategori] = useState([]);
  const [brand, setBrand] = useState([]);
  const [slug, setSlug] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);

  // Menggunakan useRef untuk mengambil nilai input
  const nameRef = useRef(null);
  const kategoriRef = useRef(null);
  const brandRef = useRef(null);
  const hargaRef = useRef(null);
  const beratRef = useRef(null);
  const stockRef = useRef(null);
  const spesifikasiRef = useRef(null);
  const imageRef = useRef(null);

  const getSlug = (e) => {
    const nama = e.target.value;
    const slug = Slugify(nama);
    setSlug(slug);
  };

  useEffect(() => {
    async function fetchData() {
      const kategoris = await getDataKategori(`/api/kategori`);
      setKategori(kategoris.data);
      const brands = await getDataBrand(`/api/brand`);
      setBrand(brands.data);
    }
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("slug", slug);
    formData.append("kategori", kategoriRef.current.value);
    formData.append("brand", brandRef.current.value);
    formData.append("harga", hargaRef.current.value);
    formData.append("berat", beratRef.current.value);
    formData.append("stock", stockRef.current.value);
    formData.append("spesifikasi", spesifikasiRef.current.value);

    for (let i = 0; i < imageRef.current.files.length; i++) {
      formData.append("image", imageRef.current.files[i]);
    }

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    // const res = await fetch("/api/product", {
    //   method: "POST",
    //   body: formData,
    // });

    // if (res.status === 200) {
    //   Swal.fire({
    //     icon: "success",
    //     title: "Produk berhasil ditambahkan!",
    //     showConfirmButton: false,
    //     timer: 2000,
    //   }).then(() => {
    //     window.location.href = "/admin/product";
    //   });
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Gagal",
    //     text: "Gagal menambahkan produk",
    //     confirmButtonText: "OK",
    //   });
    // }
  };

  return (
    <div className="container mx-auto p-6 shadow-xl rounded-lg bg-gray-50">
      <h1 className="font-bold text-2xl text-center text-blue-700 mb-6">
        Tambah Produk
      </h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <label
              htmlFor="name_product"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Nama Produk
            </label>
            <input
              required
              onChange={getSlug}
              type="text"
              name="name_product"
              id="name_product"
              ref={nameRef}
              className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            />
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Slug
            </label>
            <input
              required
              type="text"
              value={slug}
              name="slug"
              id="slug"
              disabled
              className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <label
              htmlFor="kategori"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Kategori
            </label>
            <select
              required
              className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
              name="kategori"
              id="kategori"
              ref={kategoriRef}
            >
              {kategori.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Brand
            </label>
            <select
              required
              className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
              name="brand"
              id="brand"
              ref={brandRef}
            >
              {brand.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
          <label
            htmlFor="harga"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Harga
          </label>
          <input
            type="number"
            required
            min="0"
            name="harga"
            id="harga"
            ref={hargaRef}
            className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <label
              htmlFor="berat"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Berat
            </label>
            <input
              type="number"
              name="berat"
              id="berat"
              required
              min="0"
              ref={beratRef}
              className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            />
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Stock
            </label>
            <input
              type="number"
              min="0"
              required
              name="stock"
              id="stock"
              ref={stockRef}
              className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            />
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
          <label
            htmlFor="spesifikasi"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Spesifikasi
          </label>
          <textarea
            name="spesifikasi"
            id="spesifikasi"
            required
            ref={spesifikasiRef}
            className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            rows="4"
          ></textarea>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            multiple
            ref={imageRef}
            className="w-full py-2"
            onChange={handleImageChange}
          />
          {imagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    width="150px"
                    height="150px"
                    alt={`Image Preview ${index + 1}`}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="inline-block px-6 py-2 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            Tambah Produk
          </button>
        </div>
      </form>
    </div>
  );
}
