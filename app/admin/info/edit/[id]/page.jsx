"use client";
import SubmitButton from "@/app/components/form/submitButton";
import { storage } from "@/app/lib/firebase/init";
import { uploadImageToStorage } from "@/app/lib/firebase/service";
import { Slugify } from "@/app/lib/helper";
import { ConfirmAlert } from "@/app/lib/utils/confirmalert";
import { ShowToast } from "@/app/lib/utils/successalert";
import { getDataById } from "@/app/services";
import { deleteObject, ref } from "firebase/storage";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function EditInfoPage(props) {
  const { params } = props;
  const [name, setName] = useState();
  const [slug, setSlug] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleDeleteImage = async (index, refs) => {
    let isConfirm = await ConfirmAlert();
    if (isConfirm) {
      // delete from storage
      let refFile = ref(storage, refs);
      await deleteObject(refFile);
      //update field gambar pada product
      let newState = image.filter((item, idx) => idx !== index);
      setImage(newState);
      const res = await fetch("/api/info/image", {
        method: "DELETE",
        body: JSON.stringify({
          id: params.id,
          image: newState,
        }),
      });
      if (res.status == 200) {
        ShowToast("success", "gambar berhasil diHapus");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getDataById("/api/info?id=" + params.id);
      setName(data.name);
      setSlug(data.slug);
      setDeskripsi(data.deskripsi);
      setImage(data.image);
    };
    fetchData();
  }, [params.id]);

  function getSlug(e) {
    setSlug(Slugify(e.target.value));
  }

  const uploadImage = async (e) => {
    const selectedFiles = Array.from(e.target.image.files);
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

    let newImage = Array.from(e.target.image.files);
    let updatedArray = [...image];

    if (newImage.length !== 0) {
      let imageUrl = await uploadImage(e);
      updatedArray = [...updatedArray, ...imageUrl];
      setImage(updatedArray); // Memperbarui state gambar
    }

    const res = await fetch("/api/info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: params.id,
        name: name,
        slug: slug,
        deskripsi: deskripsi,
        image: updatedArray,
      }),
    });

    if (res.status === 200) {
      setLoading(false);
      ShowToast("success", "Berhasil Update");
      window.location.href = "/admin/info";
    } else {
      setLoading(false);
      ShowToast("error", "Gagal Update");
    }
  };
  return (
    <div className="container mx-auto p-6 shadow-xl rounded-lg bg-gray-50">
      <h1 className="font-bold text-2xl text-center text-blue-700 mb-6">
        Edit Info & Tips
      </h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Nama info
            </label>
            <input
              required
              onChange={(e) => {
                getSlug(e);
                setName(e.target.value);
              }}
              value={name}
              type="text"
              name="name"
              id="name"
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
              onChange={(e) => {
                setSlug(e.target.value);
              }}
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
            value={deskripsi}
            onChange={(e) => {
              setDeskripsi(e.target.value);
            }}
            required
            className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            rows="4"
          ></textarea>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
          <div className="flex flex-wrap">
            {image.map((item, index) => (
              <div
                key={item.ref}
                className="flex flex-col items-center mb-4 mr-4"
              >
                <Image
                  src={item.url}
                  width={150}
                  height={150}
                  alt={item.ref}
                  className="rounded-lg block shadow-md"
                />
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handleDeleteImage(index, item.ref)}
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
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
          <SubmitButton disabled={loading}>Edit</SubmitButton>
        </div>
      </form>
    </div>
  );
}
