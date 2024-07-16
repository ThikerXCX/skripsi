import { formatRupiah } from "@/app/lib/helper";
import Image from "next/image";
import Link from "next/link";

export default function Productcard(props) {
  const { data } = props;
  return (
    <li>
      <Link
        href={`/product/${data.slug}`}
        className="group block overflow-hidden"
      >
        <Image
          src={data.image[0].url}
          width={100}
          height={100}
          alt=""
          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />

        <div className="relative bg-white pt-3">
          <h3 className="text-md text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {data.name}
          </h3>

          <p className="mt-2">
            <span className="tracking-wider text-gray-900">
              {" "}
              {formatRupiah(data.harga)}{" "}
            </span>
          </p>
        </div>
      </Link>
    </li>
  );
}
