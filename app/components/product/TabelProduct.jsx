import { formatRupiah } from "@/app/lib/helper";

export default function TabelProduct({ carts, totalBerat, totalHarga }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Detail Produk</h2>
      <table className="w-full table-auto bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-center text-gray-700">
            <th className="px-4  py-2">Nama Produk</th>
            <th className="px-4 text-center py-2">Harga</th>
            <th className="px-4 text-center py-2">berat</th>
            <th className="px-4 text-center py-2">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {carts &&
            carts.map((cart, index) => (
              <tr
                key={index}
                className="border-b text-center border-gray-200 hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="px-4 py-2">{cart.name}</td>
                <td className="px-4 py-2">{cart.berat}</td>
                <td className="px-4 py-2">{formatRupiah(cart.harga)}</td>
                <td className="px-4 py-2">{cart.qty}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="px-4 py-2 text-right font-bold">Total Berat:</td>
            <td className="px-4 py-2 text-left font-bold">{totalBerat} Kg</td>
            <td className="px-4 py-2 text-right font-bold">Total Harga:</td>
            <td className="px-4 py-2 text-left font-bold">
              {formatRupiah(totalHarga)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}