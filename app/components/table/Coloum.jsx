import DropDownMenuAksi from "./DropDownMenuAksi";

export const columns=  [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
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

