import { formatRupiah } from "@/app/lib/helper";
import Image from "next/image";
import Link from "next/link";
import AddToCard from "../form/AddToCard";

export default function ProductCart(props) {
  const { data } = props;
  return (
    <div itemScope itemType="http://schema.org/Product">
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

        <div className="flex justify-between gap-4">
          <AddToCard data={data} />
        </div>
      </div>
    </div>
  );
}
