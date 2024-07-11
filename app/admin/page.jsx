"use client";
import { columnsTransaksi } from "../components/table/Coloum";
import { DataTable } from "../components/table/DataTable";

const data = [
  {
    id: "728ed52f",
    transaksi: "ec-01",
    name: "udin",
    total: 100,
    status: "pending",
    email: "m@example.com",
    tes: "asd",
  },
];
const tableColumns = columnsTransaksi;

export default function AdminPage() {
  return (
    <div>
      <div className="w-full m rounded-md bg-slate-200">
        <header className="p-5 font-bold ">
          <h2>Dashboard</h2>
        </header>
      </div>
      <div className="overflow-x-auto mt-4">
        <DataTable columns={tableColumns} data={data} />
      </div>
    </div>
  );
}

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
