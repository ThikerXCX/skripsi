"use client";
import { getDataKategori } from "@/app/services/kategori";
import React, { useEffect, useState } from "react";

const DropDwonKategori = (props, ref) => {
  const [kategori, setKategori] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getDataKategori(`/api/kategori`);
      setKategori(data.data);
    }
    fetchData();
  }, []);

  return (
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
        ref={ref}
      >
        {kategori.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(DropDwonKategori);
