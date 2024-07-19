"use client";
import { formatRupiah } from "@/app/lib/helper";
import Image from "next/image";
import Link from "next/link";

export default function ProductCart({ data, addCart, loading, disabledCart }) {
  return (
    <div itemScope key={data.id} itemType="http://schema.org/Product">
      <Link
        href={`/product/${data.slug}`}
        className="group relative block overflow-hidden"
      >
        <Image
          src={data.image[0].url}
          width={500}
          height={500}
          quality={100}
          alt={data.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />
      </Link>

      <div className="relative border border-gray-100 bg-white p-6">
        <h3 className="mt-4 text-lg font-medium text-gray-900" itemProp="name">
          {data.name}
        </h3>

        <p
          className="mt-1.5 hidden text-sm text-gray-700"
          itemProp="description"
        >
          {data.spesifikasi}
        </p>

        <p className="mt-1.5 text-sm text-gray-700" itemProp="price">
          {formatRupiah(data.harga)}
        </p>

        {disabledCart ? (
          <div className="flex justify-between gap-4">
            <button
              onClick={() => addCart(data, 1)}
              disabled={loading}
              className="block w-full rounded bg-yellow-400 p-2 text-sm font-medium transition hover:scale-105"
            >
              Tambah Keranjang
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
