"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { filterCategory, getAllMenu } from "../../models/modelMenu";
import EditMenu from "../../modal/editMenu";
import TambahMenu from "../../modal/tambahMenu";
import { useRouter } from "next/navigation";
import {jwtDecode} from 'jwt-decode';

export default function MainPage() {
  
  //  Buat Hook useState
  const [getMenu, setMenu] = useState({});
  const [activeTab, setActiveTab] = useState("All"); // Default active tab
  const [isBukaModal, setBukaMOdal] = useState(false); // membuat state buka/tutup modal
  const [isBukaModalCreate, setBukaMOdalCreate] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null); // State untuk menyimpan ID menu
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [AlertDataNull, setAlertDataNull] = useState(false) //state untuk menampilkan alert jika data kosong
  
  const openModal = (id: number) => {
    setBukaMOdal(true);
    setSelectedMenuId(id);
  };
  const openModalCreate = () => {
    setBukaMOdalCreate(true);
  };
  const closeModal = () => {
    setBukaMOdal(false);
    setBukaMOdalCreate(false);
  }
  // Fungsi untuk menangani klik di luar modal (untuk menutup modal)
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Cek apakah klik terjadi di luar konten modal
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab); // Set the clicked tab as active
  };
  // Buat Fungsi untuk respon fungsi untuk tampilka data menu
  async function fetchAllMenu() {
    setLoading(true);
    // Isi nilai setValue
    if (activeTab === "All") {
      setMenu(await getAllMenu());
      setLoading(false);
    } else if (activeTab === "Makanan") {
      setMenu(await filterCategory("Makanan"));
      setLoading(false);
    } else if (activeTab === "Minuman"){
      setMenu(await filterCategory("Minuman"));
      setLoading(false);
    } else{
      setMenu(await filterCategory("Soldout"));
      setLoading(false);
    }
  }
  // BBUat Hook useEffect
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('authToken='))
      ?.split('=')[1];

    if (!token) {
      router.push('/login');
    }

    const decoded: { role: string; exp: number } = jwtDecode(token as string);
    const now = Math.floor(Date.now() / 1000);

    if (decoded.exp < now || !['ADMIN'].includes(decoded.role)) {
      router.push('/forbidden');
    }
    // Panggil fungsi fetchData
    fetchAllMenu();


    if (localStorage.getItem("Datakosong") === "true") {
      setAlertDataNull(true);
      localStorage.removeItem("Datakosong");
      setTimeout(() => {
        setAlertDataNull(false);
      }, 3000);
    }
  }, [activeTab, router]);
  
  return (
    <div className="px-10">
      {AlertDataNull&&(
        <div role="alert" className="alert alert-error mt-2.5">
        <FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon>
        <span>Error: Data Tidak Disimpan, WAJIB DIISI SEMUA!!!</span>
      </div>
      )}
      <div className="max-w-screen-md mx-auto">
  <div className="py-2 px-3 flex flex-col sm:flex-row justify-between items-center">
    {/* Filter Tabs */}
    <div className="flex flex-nowrap gap-4 mb-4 sm:mb-0 sm:flex-row overflow-x-auto whitespace-nowrap w-full">
      <p
        onClick={() => handleTabClick("All")}
        className={`inline-flex whitespace-nowrap border-b-2 py-2 px-3 text-sm transition-all duration-200 ease-in-out ${
          activeTab === "All"
            ? "border-b-blue-600 text-blue-600 font-semibold"
            : "border-transparent text-gray-600 hover:border-b-blue-600 hover:text-blue-600"
        }`}
      >
        All
      </p>
      <p
        onClick={() => handleTabClick("Makanan")}
        className={`inline-flex whitespace-nowrap border-b-2 py-2 px-3 text-sm font-medium transition-all duration-200 ease-in-out ${
          activeTab === "Makanan"
            ? "border-b-blue-600 text-blue-600 font-semibold"
            : "border-transparent text-gray-600 hover:border-b-blue-600 hover:text-blue-600"
        }`}
      >
        Makanan
      </p>
      <p
        onClick={() => handleTabClick("Minuman")}
        className={`inline-flex whitespace-nowrap border-b-2 py-2 px-3 text-sm font-medium transition-all duration-200 ease-in-out ${
          activeTab === "Minuman"
            ? "border-b-blue-600 text-blue-600 font-semibold"
            : "border-transparent text-gray-600 hover:border-b-blue-600 hover:text-blue-600"
        }`}
      >
        Minuman
      </p>
      <p
        onClick={() => handleTabClick("Soldout")}
        className={`inline-flex whitespace-nowrap border-b-2 py-2 px-3 text-sm font-medium transition-all duration-200 ease-in-out ${
          activeTab === "Soldout"
            ? "border-b-blue-600 text-blue-600 font-semibold"
            : "border-transparent text-gray-600 hover:border-b-blue-600 hover:text-blue-600"
        }`}
      >
        Stok Habis
      </p>
    </div>

    {/* Tambah Data Button */}
    <button
      onClick={openModalCreate}
      className="btn btn-outline btn-primary"
    >
      <FontAwesomeIcon icon={faPlus} className="mr-2.5" />
      Tambah Data
    </button>
  </div>
</div>


      <section className="w-fit mx-auto grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {loading ? (
        // Tampilkan elemen loading
        <div className="col-span-full flex justify-center items-center">
          <div className="flex space-x-4">
            <span className="loading loading-ring loading-lg text-blue-600"></span>
          </div>
        </div>
      ) : (<>
        {Object.values(getMenu)?.map((datamenu: any, index: number) => (
          <div
            onClick={() => {
              openModal(datamenu.id);
            }}
            key={index}
            className="w-40 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={`${datamenu.gambar_menu}`}
              alt="Menu"
              className="h-40 w-40 object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-40">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                {datamenu.kategori}
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                {datamenu.nama}
              </p>
              <div className="flex items-center">
                <p className="text-xs">Rp. </p>
                <p className="text-lg font-normal text-black cursor-auto my-3">
                  {" "}
                  {datamenu.harga.toString()}
                </p>
                <p className="text-xs ml-auto">
                {datamenu.ketersediaan}
                </p>
              </div>
            </div>
          </div>
        ))}
        </>
      )}
      </section>

      {/* Membuat modal komponen */}
      {isBukaModal && selectedMenuId !== null && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]"
        >
          <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 relative">
            <div className="flex justify-end">
              <FontAwesomeIcon
                icon={faXmark}
                className="ml-auto mb-2"
                onClick={closeModal}
              ></FontAwesomeIcon>
            </div>
            <EditMenu id={selectedMenuId}></EditMenu>
          </div>
        </div>
      )}
      {isBukaModalCreate&& (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]"
        >
          <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 relative">
            <div className="flex justify-end">
              <FontAwesomeIcon
                icon={faXmark}
                className="ml-auto mb-2"
                onClick={closeModal}
              ></FontAwesomeIcon>
            </div>
            <TambahMenu></TambahMenu>
          </div>
        </div>
      )}
    </div>
  );
}
