"use client";
import { Input } from "@/components/ui/input";
import Footer from "../components/layouts/Footer";
import { Button } from "@/components/ui/button";

export default function ServicePage(props) {
  const { searchParams } = props;
  const kode = searchParams.kode || "";
  const handle = (e) => {
    e.preventDefault();
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
            <Input type="text" name="kode" placeholder="Kode Service" />
            <Button type="submit">Cek</Button>
          </form>
        </div>
        <div className="mt-4 w-full mx-auto bg-slate-100 rounded-md">
          <div className="p-4 top-1/2 left-1/2">
            <div className="">ds</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
