"use client";

import DropDownBrand from "@/app/components/form/dropdownbrand";
import DropDwonKategori from "@/app/components/form/dropdownkategori";
import InputNumberComponenet from "@/app/components/form/inputNumberComponent";
import SubmitButton from "@/app/components/form/submitButton";
import { uploadImageToStorage } from "@/app/lib/firebase/service";
import { Slugify } from "@/app/lib/helper";
import { FieldValue } from "firebase/firestore";
import Image from "next/image";
import { useState, useRef } from "react";
import Swal from "sweetalert2";

export default function TambahProdukPage() {
  const [slug, setSlug] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setSlug(Slugify(e.target.value));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const uploadImage = async () => {
    const selectedFiles = Array.from(imageRef.current.files);
    const data = await Promise.all(
      selectedFiles.map(async (image) => {
        const imageUrl = await uploadImageToStorage(image);
        return imageUrl;
      })
    );
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const imageLink = await uploadImage();

    const res = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify({
        name: nameRef.current.value,
        slug: slug,
        harga: hargaRef.current.value,
        stock: parseInt(stockRef.current.value, 10),
        berat: parseFloat(beratRef.current.value),
        spesifikasi: spesifikasiRef.current.value,
        kategori: kategoriRef.current.value,
        brand: brandRef.current.value,
        image: imageLink,
      }),
    });

    if (res.status === 200) {
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Produk berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.location.href = "/admin/product";
      });
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menambahkan produk",
        confirmButtonText: "OK",
      });
    }
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
          <DropDwonKategori ref={kategoriRef} />
          <DropDownBrand ref={brandRef} />
        </div>
        <InputNumberComponenet
          title="Harga"
          name="harga"
          id="harga"
          min="1"
          ref={hargaRef}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputNumberComponenet
            title="berat"
            name="berat"
            id="berat"
            required
            min="0"
            ref={beratRef}
          />
          <InputNumberComponenet
            title="stock"
            min="1"
            name="stock"
            id="stock"
            ref={stockRef}
          />
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
                  <Image
                    src={src}
                    width={150}
                    height={150}
                    alt={`Image Preview ${index + 1}`}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-6 text-center">
          <SubmitButton disabled={loading}>Tambah Produk</SubmitButton>
        </div>
      </form>
    </div>
  );
}
