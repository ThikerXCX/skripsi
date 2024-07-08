"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DropDownMenuAksi({ row }) {
  const router = useRouter();

  const handleEdit = (rowData) => {
    router.push(`/admin/product/detail/${rowData.id}`);
  };

  const handleDelete = async(rowData) => {
    const res = await fetch('/api/product',{
      method : 'DELETE',
      body : JSON.stringify(rowData)
    })

    console.log(res);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
      <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={()=>{handleEdit(row.original)}}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={()=>{handleDelete(row.original)}}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
