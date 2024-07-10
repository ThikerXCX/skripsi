"use client";
import uploadImageToStorage from "@/app/lib/firebase/service";
import { Slugify } from "@/app/lib/helper";
import { getDataBrand } from "@/app/services/brand";
import { getDataKategori } from "@/app/services/kategori";
import { useEffect, useState } from "react";

export default function CreateProductPage() {
  const [kategori, setKategori] = useState([]);
  const [brand, setBrand] = useState([]);
  const [slug, setSlug] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);

  const url = process.env.HOSTNAME;

  useEffect(() => {
    async function fetchData() {
      const kategoris = await getDataKategori(`/api/kategori`);
      setKategori(kategoris.data);
      const brands = await getDataBrand(`/api/brand`);
      setBrand(brands.data);
    }
    fetchData();
  }, []);

  console.log(kategori);
  console.log(brand);

  const getSlug = (e) => {
    setSlug(Slugify(e.target.value));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreviews = files.map((file) => {
      return URL.createObjectURL(file);
    });
    setImagePreviews(newImagePreviews);
  };

  const handleChangeImage = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log(selectedFiles);
    let data = [];

    selectedFiles.map(async (image) => {
      const imageUrl = await uploadImageToStorage(image);
      data.push(imageUrl);
    });
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
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
