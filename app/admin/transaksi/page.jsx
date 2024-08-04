import { columnsTransaksi } from "@/app/components/table/Coloum";
import { DataTable } from "@/app/components/table/DataTable";
import { getDataTransaksi } from "@/app/services/transaksi";

export const dynamic = "force-dynamic";
export default async function AdminTransaksiPage() {
  const { data } = await getDataTransaksi();

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
        Laporan Transaksi
      </h1>
      <div className="w-full rounded-lg border border-zinc-600 mt-2">
        <div className="overflow-x-auto rounded-t-lg min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <DataTable data={data} columns={columnsTransaksi} />
        </div>
      </div>
    </div>
  );
}
