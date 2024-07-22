"use client";
import { formatRupiah } from "@/app/lib/helper";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DetailProduct({ data, addCart }) {
  const { status } = useSession();
  return (
    <>
      <div
        itemScope
        itemType="http://schema.org/Product"
        className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm"
      >
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">NAMA PRODUK</dt>
            <dd itemProp="name" className="text-gray-700 sm:col-span-2">
              {data.name}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">BRAND</dt>
            <dd itemProp="brand" className="text-gray-700 sm:col-span-2">
              {data.brand}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">KATEGORI</dt>
            <dd itemProp="category" className="text-gray-700 sm:col-span-2">
              {data.kategori}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Stock</dt>
            <dd itemProp="stock" className="text-gray-700 sm:col-span-2">
              {data.stock} Unit
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">HARGA</dt>
            <dd
              itemProp="offers"
              itemScope
              itemType="http://schema.org/Offer"
              className="text-gray-700 sm:col-span-2"
            >
              <span itemProp="priceCurrency" content="IDR" />
              <span itemProp="price">{formatRupiah(data.harga)}</span>
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">SPESIFIKASI</dt>
            <dd itemProp="description" className="text-gray-700 sm:col-span-2">
              <pre className="whitespace-pre-wrap">{data.spesifikasi}</pre>
            </dd>
          </div>
          <div className="flex justify-center items-center">
            {status === "authenticated" ? (
              <button
                type="button"
                onClick={() => {
                  addCart(data, 1);
                }}
                className="ml-4 px-4 py-2 w-1/2 text-center font-semibold rounded bg-yellow-500 whitespace-nowrap hover:bg-yellow-400 "
              >
                Tambah Keranjang
              </button>
            ) : (
              <Link
                href="/login"
                className="ml-4 w-1/2 text-center font-semibold px-4 py-2 rounded bg-yellow-500 whitespace-nowrap hover:bg-yellow-400 "
              >
                Login
              </Link>
            )}
          </div>
        </dl>
      </div>
    </>
  );
}
