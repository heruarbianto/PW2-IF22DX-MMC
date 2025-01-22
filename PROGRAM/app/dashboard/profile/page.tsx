"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignOutAlt,
  faCheckCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { DetailUser, updateUser } from "@/app/models/modelUser";
import { jwtDecode } from "jwt-decode";
import {
  getAllDetailPesanan,
  getAllPesanan,
} from "@/app/models/modelPemesanan";
import Receipt from "@/app/modal/receipt";

export default function Page() {
  const [imageError, setImageError] = useState(false);
  const [getIdUser, setIdUser] = useState<number>(0);
  const [getPesananId, setPesananId] = useState<number>(0);
  const [getUserId, setUserId] = useState<number>(0);


  const [userData, setUserData] = useState<{
    namaLengkap: string;
    email: string;
    username?: string;
    noHp?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPesanan, setIsModalPesanan] = useState(false);
  const [getListPesanan, setListPesanan] = useState({});
  const [getAllDetailpesanan, setAllDetailpesanan] = useState({});
  const [isBukaModalDetailPesanan, SetisBukaModalDetailPesanan] = useState(false)
  // Tentukan warna berdasarkan status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "DIBATALKAN":
        return "text-red-600";
      case "MENUNGGUPEMBAYARAN":
        return "text-yellow-600";
      case "SELESAI":
        return "text-green-600";
      case "DIPROSES":
        return "text-blue-600"; // Saya memilih biru untuk menunjukkan sedang diproses
      default:
        return "text-gray-600"; // Warna default jika status tidak dikenal
    }
  };

  const [editData, setEditData] = useState({
    namaLengkap: "",
    email: "",
    username: "",
    noHp: "",
  });

  const handleLogout = () => {
    document.cookie = "authToken=; path=/; max-age=0; secure; SameSite=Lax"; // Menghapus cookie token
    alert("Anda telah logout!");
    window.location.href = "/"; // Redirect ke halaman utama atau login
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];
    const decoded: { userId: number; role: string; exp: number } = jwtDecode(
      token as string
    );
    setIdUser(decoded.userId);
    // Ambil detail user berdasarkan userId
    DetailUser(decoded.userId).then((data) => {
      if (data && data.length > 0) {
        setUserData(data[0]);
        setEditData({
          namaLengkap: data[0].namaLengkap,
          email: data[0].email,
          username: data[0].username || "",
          noHp: data[0].noHp || "",
        });
      } else {
        alert("Gagal memuat data pengguna.");
      }
    });
    setUserId(decoded.userId);
    fetchListPesanan(decoded.userId);
    fetchListDetail(decoded.userId);
    if (localStorage.getItem("pesananSuccess") === "true") {
      setIsModalPesanan(true);
      localStorage.removeItem("pesananSuccess");
      setTimeout(() => setIsModalPesanan(false), 3000);
    }
    // idArray(getListPesanan);
    // fetchListDetail(idArray)
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchListPesanan = async (idUser: number) => {
    setListPesanan(await getAllPesanan(idUser));
  };
  // console.log(idArray)

  // const idArray =(getListPesanan:{})=>{
  // const idpemesanan =  Object.values(getListPesanan).map((pesanan: any) => {
  //     // console.log(pesanan.id); // Debugging untuk melihat id setiap pesanan
  //     return pesanan.id;
  //   });
  //   idpemesanan
  // }
  // useEffect(() => {
  //   console.log(idArray)
  //   fetchListDetail(idArray())
  // }, [])

  // console.log(idArray(getListPesanan))
  // console.log(idArray); // Output: Array dari id

  const fetchListDetail = async (idUser: number) => {
    setAllDetailpesanan(await getAllDetailPesanan(idUser));
  };

  // console.log(getAllDetailpesanan)

  // menghitung total kuantity pembelian
  const totalQuantity:any = Object.values(getAllDetailpesanan).reduce((acc, item:any) => {
    return acc + item.keranjang.quantity;
  }, 0);
  // menghitung total pengeluaran
  const totalPembelian = Object.values(getListPesanan)
  .filter((pesanan: any) => pesanan.status === 'SELESAI')
  .reduce((acc: number, pesanan: any) => {
    return acc + (pesanan.total || 0); // Tambahkan total jika ada, atau 0 jika undefined
  }, 0);


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
  

  const handleSave = async () => {
    try {
      const response = await updateUser(getIdUser, editData);
      if (response === "success") {
        alert("Profil berhasil diperbarui!");
        setUserData(editData); // Perbarui data di UI
        setIsModalOpen(false); // Tutup modal
      } else {
        alert("Terjadi kesalahan saat memperbarui profil.");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui profil.");
    }
  };
  const openModalDetailPesanan = (id: number) => {
    SetisBukaModalDetailPesanan(true);
    setPesananId(id);
  };

   // Fungsi untuk menangani klik di luar modal (untuk menutup modal)
   const handleOverlayClick = (e: React.MouseEvent) => {
    // Cek apakah klik terjadi di luar konten modal
    if (e.target === e.currentTarget) {
      SetisBukaModalDetailPesanan(false)
    }
  };
  const closeModal = () => {
    SetisBukaModalDetailPesanan(false);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {!imageError && (
                  <img
                    src="/Tukuyo-Logo.png"
                    alt=""
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
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
                <h2 className="text-xl font-semibold text-gray-800">
                  {userData?.namaLengkap}
                </h2>
                <p className="text-sm text-gray-500">{userData?.email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded"
            >
              Edit Profile
            </button>
          </div>

          {/* Statistics */}
          <div className="col-span-2 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800">Statistics</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-blue-100 text-blue-700 p-4 rounded text-center">
                <p className="text-2xl font-bold">
                  {Object.keys(getListPesanan).filter((key) => (getListPesanan as any) [key].status === 'SELESAI').length}
                </p>
                <p className="text-sm">Orders</p>
              </div>
              <div className="bg-green-100 text-green-700 p-4 rounded text-center">
                <p className="text-2xl font-bold">{totalQuantity}</p>
                <p className="text-sm">Quantity</p>
              </div>
              <div className="bg-yellow-100 text-yellow-700 p-4 rounded text-center">
                <p className="text-2xl font-bold">{formatNumber(totalPembelian)}</p>
                <p className="text-sm">Pengeluaran</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Edit Profile
              </h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={editData.username}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="namaLengkap"
                    value={editData.namaLengkap}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nomor HP
                  </label>
                  <input
                    type="text"
                    name="noHp"
                    value={editData.noHp}
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
        {/* Recent Orders */}
        <section className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Orders
          </h3>
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
                {Object.values(getListPesanan)?.map(
                  (pesanan: any, index: number) => (
                    <tr key={index} onClick={()=>openModalDetailPesanan(pesanan.id)} className="border-b hover:bg-gray-50">
                      <td className="p-4">#{pesanan.id}</td>
                      <td className="p-4">
                        {pesanan.createdAt.toDateString().substring(4)}
                      </td>
                      <td className={`p-4 ${getStatusColor(pesanan.status)}`}>
                        {pesanan.status}
                      </td>
                      <td className="p-4">
                        Rp. {pesanan.total.toLocaleString()}
                      </td>
                    </tr>
                  )
                )}
                {/* <tr className="border-b hover:bg-gray-50">
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
              </tr> */}
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

      {isModalPesanan && (
        <div
          id="toast-default"
          className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-lime-500"
            ></FontAwesomeIcon>
          </div>
          <div className="ms-3 text-sm font-normal">
            Pesanan Berhasil Dibuat, Silakan Lakukan Pembayaran
          </div>
        </div>
      )}

{isBukaModalDetailPesanan && getPesananId && getUserId !== null && (
        <div
        onClick={handleOverlayClick}
          className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]"
        >
          <div className="shadow-lg rounded-lg p-6 relative">
            <Receipt idPesanan={getPesananId} UserId={getIdUser} onCloseModal={()=>closeModal()}></Receipt>
          </div>
        </div>
      )}
    </div>
  );
}
