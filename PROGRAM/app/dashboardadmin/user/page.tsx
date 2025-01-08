"use client";

import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/app/models/modelUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function UserList() {
  const [users, setUsers] = useState<
    { id: number; namaLengkap: string; email: string; username: string; noHp: string; role: string; alamat: string }[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

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

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const saveChanges = () => {
    console.log("Updated user:", selectedUser);
    closeModal();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Daftar Pengguna</h1>

        {/* Loading */}
        {loading && <p className="text-center text-gray-600">Memuat data...</p>}

        {/* Error */}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            {/* Tabs for Role Filtering */}
            <div className="flex gap-4 mb-6">
              {["ALL", "ADMIN", "KASIR", "PELANGGAN"].map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`py-2 px-6 rounded-full font-semibold ${
                    activeRole === role
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {role === "ALL" ? "Semua" : role}
                </button>
              ))}
            </div>

            {/* Tabel Data User */}
            {filteredUsers.length > 0 ? (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Nama Lengkap</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Username</th>
                      <th className="p-4">Nomor HP</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Alamat</th>
                      <th className="p-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b hover:bg-gray-100"
                      >
                        <td className="p-4">{user.id}</td>
                        <td className="p-4">{user.namaLengkap}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">{user.username}</td>
                        <td className="p-4">{user.noHp}</td>
                        <td className="p-4">{user.role}</td>
                        <td className="p-4">{user.alamat}</td>
                        <td className="p-4">
                          <button
                            onClick={() => openEditModal(user)}
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded flex items-center gap-2"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                            Edit
                          </button>
                        </td>
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

      {/* Modal untuk Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Edit Pengguna
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={selectedUser.namaLengkap}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, namaLengkap: e.target.value })
                }
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                className="w-full border rounded p-2"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
              >
                Batal
              </button>
              <button
                onClick={saveChanges}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
