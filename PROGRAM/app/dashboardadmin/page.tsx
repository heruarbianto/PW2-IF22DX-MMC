'use client'
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import {
  getTotalPendapatan,
  getLaporanHarian,
  getLaporanMingguan,
  getLaporanBulanan,
  getJumlahPemesanan,
  getDataGrafikPendapatanBulanan,
  getDataGrafikPendapatanHarian,
  getDataGrafikPendapatanMingguan
} from "../models/modelLaporan";
import { format } from "date-fns";
// Registrasi plugin Filler
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Registering necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartData {
  tanggal: string;
  pendapatan: number;
}

const Dashboard = () => {
  const [totalProfit, setTotalProfit] = useState(0);
  const [dailyReport, setDailyReport] = useState(0);
  const [weeklyReport, setWeeklyReport] = useState(0);
  const [monthlyReport, setMonthlyReport] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [tab, setTab] = useState("daily");
  const [data, setData] = useState<{ tanggal: string; pendapatan: number }[]>([]);

  // Mengatur chartData berdasarkan tab
  const chartDat = {
    labels: data.map((entry) => entry.tanggal),
    datasets: [
      {
        label: "Pendapatan",
        data: data.map((entry) => entry.pendapatan),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  useEffect(() => {
  const fetchData = async () => {
    console.log("Fetching data for tab:", tab);

    try {
      const profit = await getTotalPendapatan();
      const daily = await getLaporanHarian();
      const weekly = await getLaporanMingguan();
      const monthly = await getLaporanBulanan();
      const orders = await getJumlahPemesanan();
      const monthlyDataRaw = await getDataGrafikPendapatanBulanan();

      const formattedChartData = monthlyDataRaw.map((entry) => ({
        tanggal: format(new Date(entry.tanggal), "yyyy-MM-dd"),
        pendapatan: entry.pendapatan,
      }));

      setTotalProfit(profit);
      setDailyReport(daily);
      setWeeklyReport(weekly);
      setMonthlyReport(monthly);
      setOrderCount(orders);
      setChartData(formattedChartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    let result;
    if (tab === "daily") {
      result = await getDataGrafikPendapatanHarian();
    } else if (tab === "weekly") {
      result = await getDataGrafikPendapatanMingguan();
    } else if (tab === "monthly") {
      result = await getDataGrafikPendapatanBulanan();
    } else {
      console.warn("Tab tidak valid");
      return;
    }

    console.log("Result for tab:", tab, result);

    if (result) {
        const formattedResult = result.map((entry) => {
            let formattedTanggal: string=""; // Tentukan tanggal sebagai string saja
          
            if (tab === "daily") {
              formattedTanggal = entry.tanggal ? format(new Date(entry.tanggal), "HH:mm") : ""; // Pastikan tanggal ada
            } else if (tab === "weekly") {
              formattedTanggal = entry.tanggal ? format(new Date(entry.tanggal), "EEEE") : ""; // Pastikan tanggal ada
            } else if (tab === "monthly") {
              formattedTanggal = entry.tanggal ? format(new Date(entry.tanggal), "dd-mm-yyyy") : ""; // Pastikan tanggal ada
            }
          
            // Periksa apakah formattedTanggal ada isinya
            return {
              tanggal: formattedTanggal || "Invalid Date", // Defaultkan ke 'Invalid Date' jika kosong
              pendapatan: entry.pendapatan,
            };
          });
          
          setData(formattedResult);
        }
  };

  fetchData();
}, [tab]);
   // fetch ulang data ketika tab berubah
   const formatNumber = (num: number): string => {
    if (num >= 1e12) {
      return (num / 1e12).toFixed(1).replace(/\.0$/, '') + 't'; // Triliun
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'm'; // Miliar
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'jt'; // Juta
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'rb'; // Ribu
    }
    return num.toString(); // Jika kurang dari 1000
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Profit</p>
          <h2 className="text-2xl font-bold">{formatNumber(totalProfit)}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Daily Report</p>
          <h2 className="text-2xl font-bold">{formatNumber(dailyReport)}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Weekly Report</p>
          <h2 className="text-2xl font-bold">{formatNumber(weeklyReport)}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Monthly Report</p>
          <h2 className="text-2xl font-bold">{formatNumber(monthlyReport)}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">Total Orders</p>
          <h2 className="text-2xl font-bold">{orderCount}</h2>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-gray-800 text-lg font-bold">Revenue Chart</h3>
      <div className="bg-gray-100 flex rounded-lg p-1">
        <button
          onClick={() => setTab("daily")}
          className={`py-2 px-4 rounded-md ${
            tab === "daily"
              ? "bg-white shadow text-gray-800 font-semibold"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Day
        </button>
        <button
          onClick={() => setTab("weekly")}
          className={`py-2 px-4 rounded-md ${
            tab === "weekly"
              ? "bg-white shadow text-gray-800 font-semibold"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Week
        </button>
        <button
          onClick={() => setTab("monthly")}
          className={`py-2 px-4 rounded-md ${
            tab === "monthly"
              ? "bg-white shadow text-gray-800 font-semibold"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Month
        </button>
      </div>
    </div>
    <div className="w-full h-full">
      <Line data={chartDat} />
    </div>
  </div>
</div>

    </div>
  );
};

export default Dashboard;
