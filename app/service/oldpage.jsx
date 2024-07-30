"use client";
import { Input } from "@/components/ui/input";
import Footer from "../components/layouts/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ServicePage(props) {
  const { searchParams } = props;
  const [kode, setKode] = useState(searchParams.kode || "");
  const [service, setService] = useState({});
  const getData = async () => {
    const response = await fetch(`/api/service?id=${kode}`);
    const data = await response.json();
    return data;
  };
  const handle = async (e) => {
    e.preventDefault();
    const { data } = await getData();
    setService(data);
    console.log(service);
  };
  return (
    <>
      <div className="container mx-auto my-10">
        <div className="w-full mx-auto">
          <form
            onSubmit={handle}
            className="flex w-full max-w-sm items-center space-x-2"
          >
            <label htmlFor="kode"></label>
            <Input
              type="text"
              onChange={(e) => setKode(e.target.value)}
              name="kode"
              placeholder="Kode Service"
            />
            <Button type="submit">Cek</Button>
          </form>
        </div>
        <div className="mt-4 w-full mx-auto bg-slate-100 rounded-md">
          <div className="p-4 top-1/2 left-1/2"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
