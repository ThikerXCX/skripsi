import { ArrowUpDown } from "lucide-react";
import DropDownMenuAksi from "./DropDownMenuAksi";

export const columns=  [
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
      )
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    id : 'actions',
    cell : ({row})=><DropDownMenuAksi row={row}/>
  }
]

