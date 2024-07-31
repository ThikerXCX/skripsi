"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-pivottable/pivottable.css";
import { getDataLaporan } from "@/app/services/laporan";

// Dynamic import to prevent SSR issues
const PivotTableUI = dynamic(() => import("react-pivottable/PivotTableUI"), {
  ssr: false,
});
const handlePrint = () => {
  window.print();
};

const ReportPage = () => {
  const [data, setData] = useState([]);
  const [pivotState, setPivotState] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const response = await getDataLaporan(`/api/laporan`);
      const transactions = response.data;

      // Normalize data
      const normalizedData = transactions.flatMap((transaction) =>
        transaction.item_details.map((item) => ({
          id: transaction.id,
          name: transaction.name,
          email: transaction.email,
          created_at: new Date(
            transaction.created_at.seconds * 1000
          ).toLocaleDateString(),
          kurir: transaction.kurir,
          status: transaction.status,
          total_harga: transaction.total_harga,
          ongkir: transaction.ongkir,
          product_name: item.name,
          product_id: item.product_id,
          product_qty: item.qty,
          product_harga: item.harga,
        }))
      );

      setData(normalizedData);
      setPivotState({ data: normalizedData });
    };

    loadData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Laporan Transaksi</h1>
      <button
        onClick={handlePrint}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Print
      </button>
      <div className="printable bg-white shadow-md rounded-lg p-6">
        <PivotTableUI {...pivotState} onChange={(s) => setPivotState(s)} />
      </div>
    </div>
  );
};

export default ReportPage;
