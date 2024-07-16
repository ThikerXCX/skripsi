import Image from "next/image";
import Link from "next/link";

export default function InfoCard(props) {
  const { data } = props;
  return (
    <li>
      {data.image[0].type == "video/mp4" ? (
        <>
          <video src={data.image[0].url} controls></video>
        </>
      ) : (
        <Link
          href={`/info/${data.slug}`}
          className="group block overflow-hidden"
        >
          <Image
            src={data.image[0].url}
            width={100}
            height={100}
            quality="100%"
            alt={data.slug}
            className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
          />

          <div className="relative bg-white pt-3">
            <h3 className="text-md text-gray-700 group-hover:underline group-hover:underline-offset-4">
              {data.name}
            </h3>
          </div>
        </Link>
      )}
    </li>
  );
}
