import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="h-screen m-2 bg-gray-100 flex justify-center items-center">
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Dapatkan penawaran terbaik untuk komputer dan aksesori!
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          Jelajahi berbagai laptop, desktop, dan gadget kami dari berbagai
          merek.
        </p>
        <Link
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          href="/product"
        >
          Jelajah Sekarang
        </Link>
      </div>
      <Image
        width={500}
        height={500}
        quality="100%"
        src="/banner.png"
        alt="Computer Banner"
        className="hidden md:block w-1/2 h-64 object-cover rounded"
      />
    </div>
  );
}
