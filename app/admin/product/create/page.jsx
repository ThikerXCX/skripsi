"use client";
import uploadImageToStorage from "@/app/lib/firebase/service";
import { useState } from "react";

export default function CreateProductPage() {
  const [file, setFile] = useState([]);

  const handleChangeImage = (e) => {
    // setFile([...file,e.target.files[0]]);
    e.preventDefault();
    const selectedFiles = Array.from(e.target.files);
    console.log(selectedFiles);
    let data = [];

    selectedFiles.map(async(image)=>{
      const imageUrl = await uploadImageToStorage(image);
      data.push(imageUrl)
    })
    console.log(data);
  };


  const handleSubmit = async (e) => {
    
  };
  return (
    <div className="w-full">
      <div className="rounded-lg bg-slate-400 p-8 shadow-lg lg:col-span-3 lg:p-12">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="sr-only" htmlFor="name">
              Name
            </label>
            <input
              className="w-full rounded-lg border-black-500 p-3 text-sm"
              placeholder="Name"
              type="text"
              id="name"
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="name">
              Name
            </label>
            <input
              onChange={(e) => {
                handleChangeImage(e);
              }}
              className="w-full rounded-lg bg-gray-400 border-black-500 p-3 text-sm"
              placeholder="Name"
              type="file"
              name="image"
              id="image"
              multiple
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
            >
              Send Enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
