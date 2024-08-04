import Link from "next/link";

export default function SuccessPaymentPage() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-10 w-1/2 md:w-1/3 lg:w-1/4">
        <h2 className="text-3xl font-bold text-green-500 mb-4">
          Pembayaran Berhasil!
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Terima kasih telah melakukan pembayaran. Kami akan segera memproses
          pesanan Anda.
        </p>
        <Link
          href="/"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
