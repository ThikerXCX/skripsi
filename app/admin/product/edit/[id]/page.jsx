"use client";
import DropDownBrand from "@/app/components/form/dropdownbrand";
import InputNumberComponenet from "@/app/components/form/inputNumberComponent";
import DropDwonKategori from "@/app/components/form/dropdownkategori";
import { getDataById } from "@/app/services";
import { useEffect, useState } from "react";
import { Slugify } from "@/app/lib/helper";
import SubmitButton from "@/app/components/form/submitButton";
import { ConfirmAlert } from "@/app/lib/utils/confirmalert";
import { storage } from "@/app/lib/firebase/init";
import { deleteObject, ref } from "firebase/storage";
import { ShowToast } from "@/app/lib/utils/successalert";
import { uploadImageToStorage } from "@/app/lib/firebase/service";
import Swal from "sweetalert2";

export default function EditProductPage(props) {
  const { params } = props;
  const [slug, setSlug] = useState();
  const [name, setName] = useState();
  const [kategori, setKategori] = useState();
  const [brand, setBrand] = useState();
  const [harga, setHarga] = useState();
  const [berat, setBerat] = useState();
  const [stock, setStock] = useState();
  const [spesifikasi, setSpesifikasi] = useState();
  const [gambar, setGambar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getDataById(`/api/product?id=` + params.id);
        setName(data.name);
        setSlug(data.slug);
        setKategori(data.kategori);
        setBrand(data.brand);
        setHarga(data.harga);
        setBerat(data.berat);
        setStock(data.stock);
        setGambar(data.image);
        setSpesifikasi(data.spesifikasi);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  function updateSlug(e) {
    setSlug(Slugify(e.target.value));
  }

  const handleDeleteImage = async (index, refs) => {
    let isConfirm = await ConfirmAlert();
    if (isConfirm) {
      // delete from storage
      let refFile = ref(storage, refs);
      await deleteObject(refFile);
      //update field gambar pada product
      let newState = gambar.filter((item, idx) => idx !== index);
      setGambar(newState);
      const res = await fetch("/api/product/image", {
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
    setLoading(true);
    e.preventDefault();
    let newImage = Array.from(e.target.image.files);
    let updatedArray = [...gambar];

    if (newImage.length !== 0) {
      let imageUrl = await uploadImage(e);
      updatedArray = [...updatedArray, ...imageUrl];
      setGambar(updatedArray); // Memperbarui state gambar
    }

    const res = await fetch("/api/product", {
      method: "PUT",
      body: JSON.stringify({
        id: params.id,
        name: name,
        slug: slug,
        kategori: kategori,
        brand: brand,
        harga: harga,
        berat: berat,
        stock: stock,
        spesifikasi: spesifikasi,
        image: updatedArray, // Menggunakan updatedArray yang terbaru
      }),
    });
    if (res.status === 200) {
      // Tampilkan SweetAlert sukses
      Swal.fire({
        icon: "success",
        title: "Data berhasil diupdate!",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.location.href = "/admin/product";
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
        Update Produk
      </h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <input type="hidden" value={params.id} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Nama Produk
            </label>
            <input
              required
              onChange={(e) => {
                updateSlug(e);
                setName(e.target.value);
              }}
              type="text"
              name="name"
              value={name}
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
              name="slug"
              value={slug}
              id="slug"
              disabled
              className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DropDwonKategori
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
          />
          <DropDownBrand
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <InputNumberComponenet
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          title="Harga"
          name="harga"
          id="harga"
          min="1"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputNumberComponenet
            value={berat}
            onChange={(e) => setBerat(e.target.value)}
            title="berat"
            name="berat"
            id="berat"
            required
            min="0"
          />
          <InputNumberComponenet
            value={stock}
            title="stock"
            onChange={(e) => setStock(e.target.value)}
            name="stock"
            id="stock"
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
            value={spesifikasi}
            onChange={(e) => setSpesifikasi(e.target.value)}
            className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            rows="4"
          ></textarea>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
          <div className="flex flex-wrap">
            {gambar.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col items-center mb-4 mr-4"
              >
                <img
                  src={item.url}
                  width="150px"
                  height="150px"
                  alt={item.id}
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
          <SubmitButton disabled={loading}>Update Produk</SubmitButton>
        </div>
      </form>
    </div>
  );
}
