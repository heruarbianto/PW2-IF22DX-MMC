"use client";

import React, {useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { DetailUser } from "@/app/models/modelUser";
import { jwtDecode } from "jwt-decode";


export default function Page() {

  const [imageError, setImageError] = useState(false);
  const [getIdUser, setidUser] = useState<number>(0);
  const [userData, setUserData] = useState<{ namaLengkap: string; email: string } | null>(null);

  const handleLogout = () => {
    document.cookie = "authToken=; path=/; max-age=0; secure; SameSite=Lax"; // Menghapus cookie token
    alert("Anda telah logout!");
    window.location.href = "/"; // Redirect ke halaman utama atau login
  };
   // BBUat Hook useEffect
     useEffect(() => {
       const token = document.cookie
         .split("; ")
         .find((row) => row.startsWith("authToken="))
         ?.split("=")[1];
       const decoded: { userId: number; role: string; exp: number } = jwtDecode(
         token as string
       );
       const now = Math.floor(Date.now() / 1000);
       setidUser(decoded.userId);
   
       // Ambil detail user berdasarkan userId
      DetailUser(decoded.userId).then((data) => {
        if (data && data.length > 0) {
          setUserData(data[0]);
        } else {
          alert("Gagal memuat data pengguna.");
        }
      });
    
       
     }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Wrapper untuk membatasi lebar layout */}
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-4">
              {/* Gambar dengan fallback FontAwesome */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {!imageError && (
                  <img
                    src="/Tukuyo-Logo.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)} // Tetapkan error jika gambar gagal dimuat
                  />
                )}
                {imageError && (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-gray-400 w-16 h-16"
                  />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{userData?.namaLengkap}</h2>
                <p className="text-sm text-gray-500">{userData?.email}</p>
              </div>
            </div>
            <button
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded">
              Edit Profile
            </button>
          </div>

          {/* Statistics */}
          <div className="col-span-2 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800">Statistics</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-blue-100 text-blue-700 p-4 rounded text-center">
                <p className="text-2xl font-bold">120</p>
                <p className="text-sm">Orders</p>
              </div>
              <div className="bg-green-100 text-green-700 p-4 rounded text-center">
                <p className="text-2xl font-bold">50</p>
                <p className="text-sm">Products</p>
              </div>
              <div className="bg-yellow-100 text-yellow-700 p-4 rounded text-center">
                <p className="text-2xl font-bold">30</p>
                <p className="text-sm">Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <section className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h3>
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 font-semibold text-gray-600">Order ID</th>
                  <th className="p-4 font-semibold text-gray-600">Date</th>
                  <th className="p-4 font-semibold text-gray-600">Status</th>
                  <th className="p-4 font-semibold text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">#12345</td>
                  <td className="p-4">2025-01-07</td>
                  <td className="p-4 text-green-600">Completed</td>
                  <td className="p-4">Rp 1,500,000</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">#12346</td>
                  <td className="p-4">2025-01-06</td>
                  <td className="p-4 text-yellow-600">Pending</td>
                  <td className="p-4">Rp 750,000</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4">#12347</td>
                  <td className="p-4">2025-01-05</td>
                  <td className="p-4 text-red-600">Cancelled</td>
                  <td className="p-4">Rp 0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Logout Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded shadow-lg transition duration-200 transform hover:scale-105"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
function fetchAllMenu() {
  throw new Error("Function not implemented.");
}

