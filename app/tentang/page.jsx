import Image from "next/image";

export default function TentangKamiPage() {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Tentang Kami</h1>
      <p className="text-lg mb-6">
        EC Computer adalah toko online laptop yang berkomitmen untuk menyediakan
        laptop-laptop berkualitas dengan harga yang terjangkau.
      </p>
      <div className="flex flex-wrap mb-6">
        <Image
          className="justify-items-center items-center"
          src="/halamanec.png"
          width={1000}
          height={1000}
          alt="halaman ec"
        />
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          {/* <Image
            src="/icon/EC.png"
            width={1000}
            height={1000}
            alt="EC Computer Logo"
            className="w-full h-24 object-contain mb-4"
          /> */}
          <h2 className="text-2xl font-bold mb-2">Misi Kami</h2>
          <p className="text-lg">
            Misi kami adalah untuk menjadi toko online laptop yang paling
            dipercaya dan disukai oleh pelanggan.
          </p>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          {/* <img
            src="/team-ec-computer.jpg"
            alt="EC Computer Team"
            className="w-full h-24 object-cover mb-4"
          /> */}
          <h2 className="text-2xl font-bold mb-2">Tim Kami</h2>
          <p className="text-lg">
            Tim kami terdiri dari orang-orang yang berpengalaman dan berdedikasi
            untuk memberikan pelayanan yang terbaik.
          </p>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          {/* <Image
            width={1000}
            height={1000}
            src="/halamanec.png"
            alt="EC Computer Office"
            className="w-full h-24 object-cover mb-4"
          /> */}
          <h2 className="text-2xl font-bold mb-2">Kantor Kami</h2>
          <p className="text-lg">
            Kantor kami terletak di [alamat kantor] dan siap melayani pelanggan
            dari seluruh Indonesia.
          </p>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Visi Kami</h2>
      <p className="text-lg">
        Visi kami adalah untuk menjadi toko online laptop yang paling besar dan
        paling dipercaya di Indonesia.
      </p>
    </div>
  );
}
