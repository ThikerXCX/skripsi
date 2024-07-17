import Image from "next/image";
import Link from "next/link";

export default function InfoCardSquare(props) {
  const { data } = props;
  return (
    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
      <Image
        src={data.image[0].url}
        className="h-56 w-full object-cover"
        height={500}
        width={500}
      />

      <div className="bg-white p-4 sm:p-6">
        <Link href={`/info/detail/${data.slug}`}>
          <h3 className="mt-0.5 text-lg text-gray-900">{data.name}</h3>
        </Link>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {data.deskripsi}
        </p>
      </div>
    </article>
  );
}
