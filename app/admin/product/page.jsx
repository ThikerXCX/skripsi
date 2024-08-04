import { columsProduct } from "@/app/components/table/Coloum";
import { DataTableProduct } from "@/app/components/table/DataTable";
import { getDataProduk } from "@/app/services/products";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductPage() {
  const { data } = await getDataProduk(
    `${process.env.NEXT_PUBLIC_HOSTNAME}api/product`
  );

  return (
    <div className="w-full p-4 bg-slate-200 rounded-md h-screen">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Product</h1>
      <div className="w-full mt-2 rounded-lg p-2  bg-white">
        <Link
          className="inline-block rounded border border-indigo-600 bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          href="/admin/product/create"
        >
          Tambah Product
        </Link>
      </div>
      <div className="w-full rounded-lg border border-zinc-600 mt-2">
        <div className="overflow-x-auto rounded-t-lg min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <DataTableProduct data={data} columns={columsProduct} />
        </div>
      </div>
    </div>
  );
}
