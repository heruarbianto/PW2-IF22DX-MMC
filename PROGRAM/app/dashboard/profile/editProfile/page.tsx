"use client";

import React, { useState, useEffect } from "react";
import { DetailUser, updateUser } from "@/app/models/modelUser"; // Pastikan Anda sudah memiliki fungsi ini
import { jwtDecode } from "jwt-decode";

export default function ProfileWithModal() {
  const [userId, setUserId] = useState<number>(0);
  const [userData, setUserData] = useState({
    namaLengkap: "",
    email: "",
    username: "",
    noHp: "",
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (token) {
      const decoded: { userId: number; role: string; exp: number } = jwtDecode(token as string);
      setUserId(decoded.userId);

      // Fetch user data
      DetailUser(decoded.userId).then((data) => {
        if (data && data.length > 0) {
          setUserData({
            namaLengkap: data[0].namaLengkap,
            email: data[0].email,
            username: data[0].username,
            noHp: data[0].noHp,
          });
        } else {
          alert("Gagal memuat data pengguna.");
        }
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await updateUser(userId, userData); // Memanggil fungsi update
      if (response === "success") {
        alert("Profil berhasil diperbarui!");
        setIsModalOpen(false); // Tutup modal
      } else {
        alert("Terjadi kesalahan saat memperbarui profil.");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui profil.");
    }
  };

  return (
    <div className="p-4">
      {/* Button to open modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Edit Profile
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                <input
                  type="text"
                  name="namaLengkap"
                  value={userData.namaLengkap}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nomor HP</label>
                <input
                  type="text"
                  name="noHp"
                  value={userData.noHp}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
