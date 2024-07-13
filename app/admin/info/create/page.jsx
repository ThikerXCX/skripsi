"use client";
import SubmitButton from "@/app/components/form/submitButton";
import { Slugify } from "@/app/lib/helper";
import { useState } from "react";

export default function CreateInfoPage() {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };
  function getSlug(e) {
    setSlug(Slugify(e.target.value));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="container mx-auto p-6 shadow-xl rounded-lg bg-gray-50">
      <h1 className="font-bold text-2xl text-center text-blue-700 mb-6">
        Tambah Info & Tips
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
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
          <label
            htmlFor="deskripsi"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Deskripsi
          </label>
          <textarea
            name="deskripsi"
            id="deskripsi"
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
          <SubmitButton disabled={loading}>Tambah Info & Tips</SubmitButton>
        </div>
      </form>
    </div>
  );
}
