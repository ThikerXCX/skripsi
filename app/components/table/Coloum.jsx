"use client"
import { ArrowUpDown } from "lucide-react";
import DropDownMenuAksi from "./DropDownMenuAksi";
import { Button } from "@/components/ui/button";

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
    accessorKey: "price",
    header: "price",
    cell: ({row}) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(amount)
 
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
    cell: ({ row }) => <DropDownMenuAksi row={row} />,
  },
];
