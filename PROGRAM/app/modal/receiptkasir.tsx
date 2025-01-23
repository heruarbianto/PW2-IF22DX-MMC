import React, { useEffect, useState } from "react";
import { getDetailPesananbyId, getPesananbyId } from "../models/modelPemesanan";
import { DetailUser } from "../models/modelUser";
import Link from "next/link";
import { ubahStatusPemesanan } from "../models/modelStatusOrder";

interface IdProps {
  idPesanan: number; // Tambahkan properti id
  UserId: number;
  onCloseModal: () => void;
}
export default function receipt({ idPesanan, UserId, onCloseModal }: IdProps) {
  const [getPesananByid, setPesananByid] = useState({});
  const [getAllDetailpesanan, setAllDetailpesanan] = useState({});
  const [getDetailUser, setDetailUser] = useState({});
  const [countdown, setCountdown] = useState(0); // Tambahkan state untuk waktu mundur

  const fetchGetDetailPesanan = async () => {
    setPesananByid(await getPesananbyId(idPesanan));
    setAllDetailpesanan(await getDetailPesananbyId(idPesanan));
    setDetailUser(await DetailUser(UserId));
  };


  const fetchWAKTU = async (Getpesanan: {}) => {
    if (!Getpesanan || Object.keys(Getpesanan).length === 0) {
      console.warn("Getpesanan is empty or undefined.");
      return;
    }

    const pesanan = Object.values(Getpesanan).map((pesananku: any) => pesananku.status);
    const Tanggalpesanan = Object.values(Getpesanan).map((pesananku: any) => pesananku.createdAt);

    if (pesanan.includes("MENUNGGUPEMBAYARAN") && Tanggalpesanan[0]) {
      const createdAt = new Date(Tanggalpesanan[0]).getTime();
      if (!isNaN(createdAt)) {
        const now = new Date().getTime();
        const expiryTime = createdAt + 24 * 60 * 60 * 1000;
        const remainingTime = expiryTime - now;

        // console.log("Remaining time:", remainingTime);
        setCountdown(remainingTime > 0 ? Math.floor(remainingTime / 1000) : 0);
      } else {
        console.error("Invalid createdAt date:", Tanggalpesanan[0]);
      }
    }
  };


  useEffect(() => {
    fetchGetDetailPesanan(); 
  }, []);

  useEffect(() => {
    if (Object.keys(getPesananByid).length > 0) {
      fetchWAKTU(getPesananByid);
    }
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [getPesananByid, countdown]);
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };


  const handleButtonClick = async () => {
    try {
      const result = await ubahStatusPemesanan([idPesanan]);
      console.log('Pembaruan berhasil:', result);
      alert('Status pemesanan berhasil diubah menjadi DIPROSES');
      window.location.reload();
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      alert('Gagal mengubah status pemesanan');
    }
  };
  const status = Object.values(getPesananByid).map(
    (pesanan: any) => pesanan.status
  )[0];
  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl hidden sm:block"></div>
        <div className="relative px-4 py-6 bg-white shadow-lg rounded-lg sm:rounded-3xl sm:px-20 sm:py-20">
          <div className="mb-4 p-0 flex justify-between items-center">
            <Link
              href=""
              className="text-start text-red-500 font-semibold"
              onClick={onCloseModal}
            >
              Tutup
            </Link>
            <div className="text-end">
              <p
                className={`text-sm font-medium px-4 py-2 rounded-full inline-block ${status === "SELESAI"
                  ? "text-green-600 bg-green-100"
                  : status === "DIPROSES"
                    ? "text-blue-600 bg-blue-100"
                    : status === "MENUNGGUPEMBAYARAN"
                      ? "text-yellow-600 bg-yellow-100"
                      : status === "DIBATALKAN"
                        ? "text-red-600 bg-red-100"
                        : "text-gray-600 bg-gray-100"
                  }`}
              >
                {status || "Status Tidak Diketahui"}
                {/* {console.log(formatTime(countdown))} */}
              </p>
              {status === "MENUNGGUPEMBAYARAN" && countdown > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Waktu tersisa: {formatTime(countdown)}
                </p>
              )}
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-8">
              <img src="/Tukuyo-Logo.png" alt="Company Logo" className="h-12" />
            </div>

            <div className="flex justify-between mb-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Tuku.yo</h2>
                <p className="text-sm text-gray-500">
                  jl. Za Pagar Alam, Bandar Lampung
                </p>
                <p className="text-sm text-gray-500">+62 896-1220-4603</p>
                <p className="text-sm text-gray-500">
                  mediamahasiswacreative@gmail.com
                </p>
              </div>
              {Object.values(getPesananByid)?.map(
                (pesanan: any, index: number) => (
                  <div key={index} className="text-right">
                    <p className="text-sm font-medium text-gray-700">
                      Invoice Number: {pesanan.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {pesanan.createdAt.toString()}
                    </p>
                  </div>
                )
              )}
            </div>
            {Object.values(getDetailUser)?.map((user: any, index: number) => (
              <div key={index} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Bill To:
                </h3>
                <p className="text-sm text-gray-600">{user.namaLengkap}</p>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">{user.noHp}</p>
                  <p className="text-sm text-gray-600 text-right">
                    {user.email}
                  </p>
                </div>
              </div>
            ))}

            <table className="w-full mb-8">
              <thead>
                <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                  <th className="py-2 text-left">Description</th>
                  <th className="py-2 text-right">Qty</th>
                  <th className="py-2 text-right">Rate</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(getAllDetailpesanan)?.map(
                  (item: any, index: number) => (
                    <tr key={index} className="text-sm text-gray-600">
                      <td className="py-4 text-left">
                        {item.keranjang.menu.nama}
                        <div className="text-xs text-gray-500">
                          {/* Catatan kecil */}
                          {item.note || " "}
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        {item.keranjang.quantity}
                      </td>
                      <td className="py-4 text-right">
                        {item.keranjang.menu.harga?.toLocaleString()}
                      </td>
                      <td className="py-4 text-right">
                        {item.keranjang.total?.toLocaleString()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            <div className="flex justify-end mb-8">
              {Object.values(getPesananByid)?.map(
                (pesanan: any, index: number) => (
                  <div key={index} className="text-right">
                    <p className="text-sm text-gray-600 mb-1">
                      Subtotal: {pesanan.totalProduk.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      PPN (11%): {(pesanan.totalProduk * 0.11).toLocaleString()}
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      Total: {pesanan.total.toLocaleString()}
                    </p>
                  </div>
                )
              )}
            </div>

            <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
              onClick={handleButtonClick}
            >
              Terima Pembayaran
            </button>

          </div>



          <div className="flex justify-center space-x-4">

          </div>
        </div>
      </div>
    </div>
  );
}
