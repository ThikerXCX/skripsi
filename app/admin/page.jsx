"use client";
import { GrServices } from "react-icons/gr";
import { Line } from "react-chartjs-2";
import { MdOutlineSell } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import CardCount from "../components/card/CardCount";
import {
  getDataServiceDashboard,
  getDataTransaksiDashboard,
} from "../services/dashboard";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminPage() {
  const [transaksi, setTransaksi] = useState([]);
  const [service, setService] = useState([]);

  useEffect(() => {
    const bulan = new Date().getMonth() + 1;
    const tahun = new Date().getFullYear();

    async function getData() {
      const { data: transaksi } = await getDataTransaksiDashboard(bulan, tahun);
      setTransaksi(transaksi);
      const { data: service } = await getDataServiceDashboard(bulan, tahun);
      setService(service);
    }
    getData();
  }, []);

  const { transaksiIs1, transaksiIs2Or3 } = transaksi.reduce(
    (acc, item) => {
      if (item.statusCode === 1) acc.transaksiIs1.push(item);
      else {
        acc.transaksiIs2Or3.push(item);
      }
      return acc;
    },
    { transaksiIs1: [], transaksiIs2Or3: [] }
  );

  const { serviceIs6, serviceIs5 } = service.reduce(
    (acc, item) => {
      if (item.statusCode === 6) {
        acc.serviceIs6.push(item);
      } else if (item.statusCode === 5) {
        acc.serviceIs5.push(item);
      }
      return acc;
    },
    { serviceIs6: [], serviceIs5: [] }
  );

  const dataChartTransaksi = {
    labels: ["Transaksi", "Transaksi Perlu Dikirim", "Transaksi Selesai"],
    datasets: [
      {
        label: "Jumlah Transaksi",
        data: [transaksi.length, transaksiIs1.length, transaksiIs2Or3.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataChartService = {
    labels: ["Service", "Service Belum Diambil", "Service Selesai"],
    datasets: [
      {
        label: "Jumlah Service",
        data: [service.length, serviceIs5.length, serviceIs6.length],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className="w-full m rounded-md bg-slate-200">
        <header className="p-5 font-bold ">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
            Dashboard
          </h2>
        </header>
      </div>
      <div className="grid p-4 grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        <CardCount
          title={"Service"}
          count={service.length}
          icon={<GrServices size={40} />}
        />
        <CardCount
          title={"Service Belum Diambil"}
          count={serviceIs5.length}
          icon={<GrServices size={40} />}
        />
        <CardCount
          title={"Service Telah Diambil"}
          count={serviceIs6.length}
          icon={<GrServices size={40} />}
        />
        <CardCount
          title={"Transaksi"}
          count={transaksi.length}
          icon={<MdOutlineSell size={40} />}
        />
        <CardCount
          title={"Transaksi Yang Harus Dikirim"}
          count={transaksiIs1.length}
          icon={<MdOutlineSell size={40} />}
        />
        <CardCount
          title={"Transaksi Selesai"}
          count={transaksiIs2Or3.length}
          icon={<AiOutlineProduct size={40} />}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <div className="h-full rounded-lg bg-gray-200">
          <Line data={dataChartTransaksi} options={options} />
        </div>
        <div className="h-full rounded-lg bg-gray-200">
          <Line data={dataChartService} options={options} />
        </div>
      </div>
    </div>
  );
}
