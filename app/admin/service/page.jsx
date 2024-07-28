import { coloumsService } from "@/app/components/table/Coloum";
import { DataTableService } from "@/app/components/table/DataTable";
import { getDataService } from "@/app/services/service";
import Link from "next/link";

export default async function ServicePage() {
  const { data } = await getDataService(`${process.env.HOSTNAME}api/service`);
  return (
    <div className="w-full p-4 bg-slate-200 rounded-md h-screen">
      <h1 className="font-bold">Service</h1>
      <div className="w-full mt-2 rounded-lg p-2  bg-white">
        <Link
          className="inline-block rounded border border-indigo-600 bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          href="/admin/service/create"
        >
          Tambah Service
        </Link>
      </div>
      <div className="w-full rounded-lg border border-zinc-600 mt-2">
        <div className="overflow-x-auto rounded-t-lg min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <DataTableService data={data} columns={coloumsService} />
        </div>
      </div>
    </div>
  );
}
