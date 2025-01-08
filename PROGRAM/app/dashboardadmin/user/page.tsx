"use client";

import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/app/models/modelUser";

export default function UserList() {
  const [users, setUsers] = useState<
    { id: number; namaLengkap: string; email: string; username: string; noHp: string; role: string; alamat: string }[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeRole, setActiveRole] = useState<string>("ALL");

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        if (data) {
          setUsers(data);
        } else {
          setError("Gagal memuat data pengguna.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Terjadi kesalahan saat memuat data.");
        setLoading(false);
      });
  }, []);

  const filteredUsers =
    activeRole === "ALL" ? users : users.filter((user) => user.role === activeRole);

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Daftar Pengguna</h1>

        {/* Loading */}
        {loading && <p className="text-center text-gray-600">Memuat data...</p>}

        {/* Error */}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            {/* Tabs for Role Filtering */}
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setActiveRole("ALL")}
                className={`py-2 px-4 rounded ${
                  activeRole === "ALL"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setActiveRole("ADMIN")}
                className={`py-2 px-4 rounded ${
                  activeRole === "ADMIN"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setActiveRole("KASIR")}
                className={`py-2 px-4 rounded ${
                  activeRole === "KASIR"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Kasir
              </button>
              <button
                onClick={() => setActiveRole("PELANGGAN")}
                className={`py-2 px-4 rounded ${
                  activeRole === "PELANGGAN"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Pelanggan
              </button>
            </div>

            {/* Tabel Data User */}
            {filteredUsers.length > 0 ? (
              <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-4 font-semibold text-gray-600">ID</th>
                      <th className="p-4 font-semibold text-gray-600">
                        Nama Lengkap
                      </th>
                      <th className="p-4 font-semibold text-gray-600">Email</th>
                      <th className="p-4 font-semibold text-gray-600">
                        Username
                      </th>
                      <th className="p-4 font-semibold text-gray-600">
                        Nomor HP
                      </th>
                      <th className="p-4 font-semibold text-gray-600">Role</th>
                      <th className="p-4 font-semibold text-gray-600">Alamat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-4">{user.id}</td>
                        <td className="p-4">{user.namaLengkap}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">{user.username}</td>
                        <td className="p-4">{user.noHp}</td>
                        <td className="p-4">{user.role}</td>
                        <td className="p-4">{user.alamat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-600">
                Tidak ada pengguna untuk role ini.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
