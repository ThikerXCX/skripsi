'use client'
import { columns } from "../components/table/Coloum";
import { DataTable } from "../components/table/DataTable";

const data = [{
  id: "728ed52f",
  amount: 100,
  status: "pending",
  email: "m@example.com",
},
]

// const router = useRouter()

// const handleEdit = (rowData) => {
//     const url = `/product/${rowData.id}`
//     return router.push(url)
  
// };

// const handleDelete = async(rowData) => {
//   const res = await fetch('/api/product',{
//     method : 'DELETE',
//     body : JSON.stringify(rowData)
//   })
// };

// const tableColumns = columns({ onEdit:onEdit,  onDelete: handleDelete });
const tableColumns = columns;

export default function AdminPage() {
  return (
    <div>
      <div className="w-full rounded-md bg-slate-200">
        <header className="p-5 font-bold ">
          <h2>Dashboard</h2>
        </header>
      </div>
      <div className="mt-2 mb-2">
          <button type="button" className="px-4 py-2 bg-blue-800 rounded-md text-sky-100 hover:bg-sky-400 cursor-pointer">Tambah</button>
        </div>
      <div className="overflow-x-auto" >
          <DataTable columns={tableColumns} data={data} />
        </div>
    </div>
  );
}
