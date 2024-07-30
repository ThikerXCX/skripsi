"use client";
import { Input } from "@/components/ui/input";
import Footer from "../components/layouts/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ServicePage(props) {
  const { searchParams } = props;
  const [kode, setKode] = useState(searchParams.kode || "");
  const [service, setService] = useState(null);

  const getData = async () => {
    const response = await fetch(`/api/service?id=${kode}`);
    const data = await response.json();
    return data;
  };

  const handle = async (e) => {
    e.preventDefault();
    const { data } = await getData();
    setService(data);
  };

  return (
    <>
      <div className="container mx-auto my-10">
        <div className="w-full mx-auto">
          <form
            onSubmit={handle}
            className="flex w-full max-w-md items-center space-x-2 p-4 bg-gray-50 border border-gray-200 rounded-md shadow-md"
          >
            <Input
              type="text"
              onChange={(e) => setKode(e.target.value)}
              name="kode"
              placeholder="Kode Service"
              className="flex-1"
            />
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Cek
            </Button>
          </form>
        </div>
        {service && (
          <div className="mt-6 w-full mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Service Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Informasi Utama</h3>
                <ul className="list-none space-y-2">
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700">Kode:</span>
                    <span>{service.id}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Nama Perangkat:
                    </span>
                    <span>{service.namaPerangkat}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Nama Customer:
                    </span>
                    <span>{service.namaCustomer}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      No HP Customer:
                    </span>
                    <span>{service.noHpCustomer}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700">Keluhan:</span>
                    <span>{service.keluhan}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700">Garansi:</span>
                    <span>{service.garansi ? "Ya" : "Tidak"}</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 border border-gray-200 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Kelengkapan</h3>
                <ul className="list-none space-y-2">
                  {Object.entries(service.kelengkapan).map(
                    ([item, available]) => (
                      <li key={item} className="flex justify-between">
                        <span className="font-medium text-gray-700 capitalize">
                          {item.replace(/_/g, " ")}:
                        </span>
                        <span>{available ? "Ada" : "Tidak Ada"}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="p-4 border border-gray-200 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Status</h3>
                <ul className="list-none space-y-2">
                  {service.status.map((status, index) => (
                    <li key={index} className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Status {index + 1}:
                      </span>
                      <span>{status}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
