import { formatRupiah } from "@/app/lib/helper";
import Image from "next/image";
import Link from "next/link";

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

        <div className="relative border border-gray-100 bg-white p-6">
          <h3
            className="mt-4 text-lg font-medium text-gray-900"
            itemProp="name"
          >
            {data.name}
          </h3>

          <p className="mt-1.5 text-sm text-gray-700" itemProp="description">
            {data.description}
          </p>

          <p className="mt-1.5 text-sm text-gray-700" itemProp="price">
            {formatRupiah(data.harga)}
          </p>

          <form className="mt-4">
            <button className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
              Tambah Keranjang
            </button>
          </form>
        </div>
      </Link>
    </div>
  );
}
