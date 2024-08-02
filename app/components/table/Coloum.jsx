"use client";
import { ArrowUpDown } from "lucide-react";
import DropDownMenuAksi from "./DropDownMenuAksi";
import { Button } from "@/components/ui/button";
import ButtonService from "./ButtonService";

export const columnsTransaksi = [
  {
    accessorKey: "transaksi",
    header: "Transaksi",
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    id: "actions",
    header: "aksi",
    cell: ({ row }) => <DropDownMenuAksi row={row} />,
  },
];

export const columsProduct = [
  {
    accessorKey: "name",
    selector: "name",
    header: "Name",
  },
  {
    accessorKey: "brand",
    selector: "brand",
    header: "Brand",
  },
  {
    accessorKey: "kategori",
    selector: "kategori",
    header: "Kategori",
  },
  {
    accessorKey: "harga",
    header: "harga",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("harga"));
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount);

      return formatted;
    },
  },
  {
    accessorKey: "stock",
    selector: "stock",
    header: "stock",
  },
  {
    id: "actions",
    header: "aksi",
    cell: ({ row }) => <DropDownMenuAksi row={row} route="product" />,
  },
];

export const columnsKategori = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    id: "actions",
    header: "aksi",
    cell: ({ row }) => <DropDownMenuAksi row={row} route="kategori" />,
  },
];

export const columnsBrand = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    id: "actions",
    header: "aksi",
    cell: ({ row }) => <DropDownMenuAksi row={row} route="brand" />,
  },
];

export const columnsInfo = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "deskripsi",
    header: "Deskripsi",
    cell: ({ row }) => (
      <div className="truncate whitespace-nowrap overflow-hidden max-w-xs">
        {row.getValue("deskripsi")}
      </div>
    ),
  },
  {
    id: "actions",
    header: "aksi",
    cell: ({ row }) => <DropDownMenuAksi row={row} route="info" />,
  },
];

export const coloumsService = [
  {
    accessorKey: "id",
    header: "No Service",
  },
  {
    accessorKey: "namaCustomer",
    header: "Nama Customer",
  },
  {
    accessorKey: "namaPerangkat",
    header: "Nama Perangkat",
  },
  {
    accessorKey: "noHpCustomer",
    header: "No HP",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="truncate whitespace-nowrap overflow-hidden">
        {row.getValue("status")[row.getValue("status").length - 1]}
      </div>
    ),
  },
  {
    accessorKey: "keluhan",
    header: "Keluhan",
    cell: ({ row }) => (
      <div className="truncate whitespace-nowrap overflow-hidden ">
        {row.getValue("keluhan")}
      </div>
    ),
  },
  {
    id: "confirm",
    header: "Konfirmasi",
    cell: ({ row }) => <ButtonService row={row} />,
  },
  {
    id: "actions",
    header: "aksi",
    cell: ({ row }) => <DropDownMenuAksi row={row} route="service" />,
  },
];
