import { formatRupiah } from "@/app/lib/helper";
import { useSession } from "next-auth/react";

export default function DetailProduct(props) {
  const { status } = useSession();
  const { data } = props;
  return (
    <>
      <div
        itemScope
        itemType="http://schema.org/Product"
        className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm"
      >
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">NAMA PRODUK</dt>
            <dd itemProp="name" className="text-gray-700 sm:col-span-2">
              {data.name}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">BRAND</dt>
            <dd itemProp="brand" className="text-gray-700 sm:col-span-2">
              {data.brand}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">KATEGORI</dt>
            <dd itemProp="category" className="text-gray-700 sm:col-span-2">
              {data.kategori}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">HARGA</dt>
            <dd
              itemProp="offers"
              itemScope
              itemType="http://schema.org/Offer"
              className="text-gray-700 sm:col-span-2"
            >
              <span itemProp="priceCurrency" content="IDR" />
              <span itemProp="price">Rp. {formatRupiah(data.harga)}</span>
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">SPESIFIKASI</dt>
            <dd itemProp="description" className="text-gray-700 sm:col-span-2">
              <pre className="whitespace-pre-wrap">{data.spesifikasi}</pre>
            </dd>
          </div>
          {status === "authenticated" ? (
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <form className="flex" action="">
                <label htmlFor="Quantity" className="sr-only">
                  Quantity
                </label>

                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    id="Quantity"
                    min={1}
                    max={data.stock}
                    className="h-10 w-24 rounded border-gray-500 shadow-md outline-slate-600 text-center sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="ml-4 px-4 py-2 rounded bg-sky-700 whitespace-nowrap hover:bg-sky-400 "
                >
                  Tambah Keranjang
                </button>
              </form>
            </div>
          ) : (
            ""
          )}
        </dl>
      </div>
    </>
  );
}
