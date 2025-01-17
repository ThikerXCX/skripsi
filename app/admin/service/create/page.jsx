"use client";
import { generateNoService, sendMessage } from "@/app/lib/helper";
import { useState } from "react";
import Swal from "sweetalert2";

const LaptopServiceForm = () => {
  const [formData, setFormData] = useState({
    id: generateNoService(),
    namaCustomer: "",
    noHpCustomer: "",
    namaPerangkat: "",
    serialNumber: "",
    garansi: false,
    kelengkapan: {
      baterai: false,
      hdd_ssd: false,
      charger: false,
      ram: false,
      tas: false,
    },
    keluhan: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name in formData.kelengkapan) {
        setFormData({
          ...formData,
          kelengkapan: {
            ...formData.kelengkapan,
            [name]: checked,
          },
        });
      } else {
        setFormData({
          ...formData,
          [name]: checked,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.id) newErrors.id = "No Service harus diisi";
    if (!formData.namaCustomer)
      newErrors.namaCustomer = "Nama Customer harus diisi";
    if (!formData.noHpCustomer)
      newErrors.noHpCustomer = "No HP Customer harus diisi";
    if (!formData.namaPerangkat)
      newErrors.namaPerangkat = "Nama Perangkat harus diisi";
    if (!formData.keluhan) newErrors.keluhan = "Keluhan harus diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendMessage(formData, "create");
    if (validate()) {
      const res = await fetch(`/api/service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const response = await res.json();
      if (response.status) {
        Swal.fire({
          icon: "success",
          title: "berhasil menambahkan service!",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          window.location.href = "/admin/service";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menambahkan service",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Form Input Data Service Laptop
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Data Service */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Data Service</h3>
            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="noService"
              >
                No Service
              </label>
              <input
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
              {errors.id && <p className="text-red-500 text-sm">{errors.id}</p>}
            </div>
            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="namaCustomer"
              >
                Nama Customer
              </label>
              <input
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                type="text"
                id="namaCustomer"
                name="namaCustomer"
                value={formData.namaCustomer}
                onChange={handleChange}
              />
              {errors.namaCustomer && (
                <p className="text-red-500 text-sm">{errors.namaCustomer}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="noHpCustomer"
              >
                No HP Customer
              </label>
              <input
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                type="text"
                id="noHpCustomer"
                name="noHpCustomer"
                value={formData.noHpCustomer}
                onChange={handleChange}
              />
              {errors.noHpCustomer && (
                <p className="text-red-500 text-sm">{errors.noHpCustomer}</p>
              )}
            </div>
          </div>

          {/* Data Perangkat */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Data Perangkat</h3>
            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="namaPerangkat"
              >
                Nama Perangkat
              </label>
              <input
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                type="text"
                id="namaPerangkat"
                name="namaPerangkat"
                value={formData.namaPerangkat}
                onChange={handleChange}
              />
              {errors.namaPerangkat && (
                <p className="text-red-500 text-sm">{errors.namaPerangkat}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="serialNumber"
              >
                Serial Number
              </label>
              <input
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                type="text"
                id="serialNumber"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
              />
              {errors.serialNumber && (
                <p className="text-red-500 text-sm">{errors.serialNumber}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Garansi</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    className="form-checkbox focus:ring focus:ring-blue-200"
                    type="checkbox"
                    name="garansi"
                    checked={formData.garansi}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Ya</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Kelengkapan Perangkat */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Kelengkapan Perangkat</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center">
              <input
                className="form-checkbox focus:ring focus:ring-blue-200"
                type="checkbox"
                name="baterai"
                checked={formData.kelengkapan.baterai}
                onChange={handleChange}
              />
              <span className="ml-2">Baterai</span>
            </label>
            <label className="flex items-center">
              <input
                className="form-checkbox focus:ring focus:ring-blue-200"
                type="checkbox"
                name="hdd_ssd"
                checked={formData.kelengkapan.hdd_ssd}
                onChange={handleChange}
              />
              <span className="ml-2">HDD/SSD</span>
            </label>
            <label className="flex items-center">
              <input
                className="form-checkbox focus:ring focus:ring-blue-200"
                type="checkbox"
                name="charger"
                checked={formData.kelengkapan.charger}
                onChange={handleChange}
              />
              <span className="ml-2">Charger</span>
            </label>
            <label className="flex items-center">
              <input
                className="form-checkbox focus:ring focus:ring-blue-200"
                type="checkbox"
                name="ram"
                checked={formData.kelengkapan.ram}
                onChange={handleChange}
              />
              <span className="ml-2">RAM</span>
            </label>
            <label className="flex items-center">
              <input
                className="form-checkbox focus:ring focus:ring-blue-200"
                type="checkbox"
                name="tas"
                checked={formData.kelengkapan.tas}
                onChange={handleChange}
              />
              <span className="ml-2">Tas</span>
            </label>
          </div>
        </div>

        {/* Data Keterangan */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Data Keterangan</h3>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium" htmlFor="keluhan">
              Keluhan
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              id="keluhan"
              name="keluhan"
              rows="4"
              value={formData.keluhan}
              onChange={handleChange}
            ></textarea>
            {errors.keluhan && (
              <p className="text-red-500 text-sm">{errors.keluhan}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-200"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LaptopServiceForm;
