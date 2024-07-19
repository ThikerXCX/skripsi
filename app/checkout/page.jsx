"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [ongkir, setOngkir] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [selectedKota, setSelectedKota] = useState(null);
  const [address, setAddress] = useState({
    nama: "",
    alamat: "",
    provinsi: "",
    kota: "",
    kodePos: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/rajaongkir/provinsi`);
      const { data } = await res.json();
      setProvinsi(data);
    };
    fetchData();
  }, []);

  const handleProvinsiChange = async (e) => {
    setSelectedProvinsi(e.target.value);
    const res = await fetch(`/api/rajaongkir/kota?id=${e.target.value}`);
    const { data } = await res.json();
    setKota(data);
  };

  const handleKotaChange = (e) => {
    setSelectedKota(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!address.nama) {
      errors.nama = "Nama is required";
    }
    if (!address.alamat) {
      errors.alamat = "Alamat is required";
    }
    if (!selectedProvinsi) {
      errors.provinsi = "Provinsi is required";
    }
    if (!selectedKota) {
      errors.kota = "Kota is required";
    }
    if (!address.kodePos) {
      errors.kodePos = "Kode Pos is required";
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Call API to process payment and update order status
      console.log("Submit checkout form");
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label className="block mb-2">
          Nama:
          <input
            type="text"
            name="nama"
            value={address.nama}
            onChange={handleAddressChange}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
          {errors.nama && (
            <div className="text-red-500 text-sm">{errors.nama}</div>
          )}
        </label>
        <br />
        <label className="block mb-2">
          Alamat:
          <input
            type="text"
            name="alamat"
            value={address.alamat}
            onChange={handleAddressChange}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
          {errors.alamat && (
            <div className="text-red-500 text-sm">{errors.alamat}</div>
          )}
        </label>
        <br />
        <label className="block mb-2">
          Provinsi:
          <select
            value={selectedProvinsi}
            onChange={handleProvinsiChange}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          >
            <option value="">Select Provinsi</option>
            {provinsi.map((item, index) => (
              <option key={index} value={item.province_id}>
                {item.province}
              </option>
            ))}
          </select>
          {errors.provinsi && (
            <div className="text-red-500 text-sm">{errors.provinsi}</div>
          )}
        </label>
        <br />
        <label className="block mb-2">
          Kota:
          <select
            value={selectedKota}
            onChange={handleKotaChange}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          >
            <option value="">Select Kota</option>
            {kota.map((item, index) => (
              <option key={index} value={item.city_id}>
                {item.city_name}
              </option>
            ))}
          </select>
          {errors.kota && (
            <div className="text-red-500 text-sm">{errors.kota}</div>
          )}
        </label>
        <br />
        <label className="block mb-2">
          Kode Pos:
          <input
            type="text"
            name="kodePos"
            value={address.kodePos}
            onChange={handleAddressChange}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
          {errors.kodePos && (
            <div className="text-red-500 text-sm">{errors.kodePos}</div>
          )}
        </label>
        <br />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Checkout
        </button>
      </form>
    </div>
  );
}
