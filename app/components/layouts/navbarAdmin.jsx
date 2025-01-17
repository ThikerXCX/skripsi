"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarAdmin() {
  const pathName = usePathname();
  return (
    <div className="flex h-screen border-slate-200 flex-col justify-between border-e bg-white">
      <div className="px-4 py-6">
        <span className="flex h-10 w-48 items-center justify-center rounded-lg bg-gray-300 text-xl font-bold text-gray-600">
          <Image
            className="mr-2"
            src="/icon/EC.svg"
            width={35}
            height={35}
            alt="logo"
          />
          <span>EC COMPUTER</span>
        </span>

        <ul className="mt-6 space-y-1">
          <li>
            <Link
              href="/admin"
              className={`${
                pathName === "/admin" ? "bg-slate-300" : ""
              } block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-300`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/admin/service"
              className={`${
                pathName === "/admin/service" ? "bg-slate-300" : ""
              } block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-300 `}
            >
              service
            </Link>
          </li>
          <li>
            <Link
              href="/admin/kategori"
              className={`${
                pathName === "/admin/kategori" ? "bg-slate-300" : ""
              } block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-300 `}
            >
              Kategori
            </Link>
          </li>
          <li>
            <Link
              href="/admin/brand"
              className={`${
                pathName === "/admin/brand" ? "bg-slate-300" : ""
              } block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-300 `}
            >
              Brand
            </Link>
          </li>
          <li>
            <Link
              href="/admin/product"
              className={`${
                pathName.startsWith("/admin/product") ? "bg-slate-300" : ""
              } block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-300 `}
            >
              Produk
            </Link>
          </li>
          <li>
            <Link
              href="/admin/info"
              className={`${
                pathName === "/admin/info" ? "bg-slate-300" : ""
              } block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-300 `}
            >
              Info & Tips
            </Link>
          </li>
          <li>
            <Link
              href="/admin/laporan/transaksi"
              className={`${
                pathName === "/admin/laporan/transaksi" ? "bg-slate-300" : ""
              } block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-300 `}
            >
              Laporan Transaksi
            </Link>
          </li>
          <li>
            <Link
              href="/admin/laporan/service"
              className={`${
                pathName === "/admin/laporan/service" ? "bg-slate-300" : ""
              } block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-300 `}
            >
              Laporan Service
            </Link>
          </li>
          <li>
            <Link
              href="/admin/transaksi"
              className={`${
                pathName === "/admin/transaksi" ? "bg-slate-300" : ""
              } block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-300 `}
            >
              Transaksi
            </Link>
          </li>
          <li>
            <button
              onClick={() => signOut()}
              className="w-full text-left hover:bg-slate-300 block rounded-lg px-4 py-2 text-sm font-medium text-gray-700"
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
