import { columnsTransaksi } from "../components/table/Coloum";
import { DataTable } from "../components/table/DataTable";
import { getDashBoard } from "../services/dashboard";

export default async function AdminPage() {
  const data = await getDashBoard();
  return (
    <div>
      <div className="w-full m rounded-md bg-slate-200">
        <header className="p-5 font-bold ">
          <h2>Dashboard</h2>
        </header>
      </div>
      <div className="overflow-x-auto mt-4">
        <DataTable columns={columnsTransaksi} data={data} />
      </div>
    </div>
  );
}
