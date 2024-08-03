// app/components/ReportPage.js
"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-pivottable/pivottable.css";
import {
  getDataLaporanBulanan,
  getDataLaporanTahunan,
} from "@/app/services/laporan";

// Dynamic import to prevent SSR issues
const PivotTableUI = dynamic(() => import("react-pivottable/PivotTableUI"), {
  ssr: false,
});

const ReportPage = () => {
  const [data, setData] = useState([]);
  const [pivotState, setPivotState] = useState({});
  const [bulan, setBulan] = useState(new Date().getMonth() + 1);
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [showAllData, setShowAllData] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        let response;
        if (!showAllData) {
          response = await getDataLaporanBulanan(bulan, tahun);
        } else {
          response = await getDataLaporanTahunan(tahun);
        }

        const transactions = response.data;
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
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [bulan, tahun, showAllData]);

  const handleBulanChange = (e) => setBulan(parseInt(e.target.value, 10));
  const handleTahunChange = (e) => setTahun(parseInt(e.target.value, 10));
  const handlePrint = () => window.print();

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        Laporan Transaksi
      </h1>
      <div className="flex justify-end mb-6 items-center">
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Print
        </button>
        <div className="flex items-center space-x-2 ml-4 mr-4">
          <label htmlFor="showAll" className="text-sm text-gray-700">
            Tampilkan Data Tahunan
          </label>
          <input
            type="checkbox"
            name="showAll"
            id="showAll"
            checked={showAllData}
            onChange={() => setShowAllData((prev) => !prev)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
        </div>
        <div className="flex space-x-4">
          <select
            value={bulan}
            disabled={showAllData}
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
            {[2022, 2023, 2024, 2025].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="printable bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
        <PivotTableUI {...pivotState} onChange={setPivotState} />
      </div>
    </div>
  );
};

export default ReportPage;
