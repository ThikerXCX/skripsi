"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-pivottable/pivottable.css";
import { retriveDataBulanTertentu } from "@/app/lib/firebase/service";

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
  const [bulan, setBulan] = useState(new Date().getMonth() + 1);
  const [tahun, setTahun] = useState(new Date().getFullYear());

  useEffect(() => {
    const loadData = async () => {
      const response = await retriveDataBulanTertentu(
        "transaksi",
        bulan,
        tahun
      );
      const transactions = response;

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
  }, [bulan, tahun]);

  const handleBulanChange = (e) => {
    setBulan(e.target.value);
  };

  const handleTahunChange = (e) => {
    setTahun(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        Laporan Transaksi
      </h1>
      <div className="flex justify-between mb-6 items-center">
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Print
        </button>
        <div className="flex space-x-4">
          <select
            value={bulan}
            onChange={handleBulanChange}
            className="w-36 py-2 px-4 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          >
            <option value="1">Januari</option>
            <option value="2">Februari</option>
            <option value="3">Maret</option>
            <option value="4">April</option>
            <option value="5">Mei</option>
            <option value="6">Juni</option>
            <option value="7">Juli</option>
            <option value="8">Agustus</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Desember</option>
          </select>
          <select
            value={tahun}
            onChange={handleTahunChange}
            className="w-36 py-2 px-4 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          >
            {[2022, 2023, 2024, 2025].map((tahun) => (
              <option key={tahun} value={tahun}>
                {tahun}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="printable bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
        <PivotTableUI {...pivotState} onChange={(s) => setPivotState(s)} />
      </div>
    </div>
  );
};

export default ReportPage;
