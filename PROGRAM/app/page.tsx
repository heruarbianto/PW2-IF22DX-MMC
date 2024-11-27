"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { filterCategoryReady, filterCategorySold, getAllMenuReady, getAllMenuSold } from "./models/modelMenu";
import DetailMenu from "./Modal/detailMenu";

export default function MainPage() {
  //  Buat Hook useState
  const [getMenuReady, setMenuReady] = useState({});
  const [getMenuSold, setMenuSold] = useState({});
  const [activeTab, setActiveTab] = useState("All"); // Default active tab
  const [isBukaModal, setBukaMOdal] = useState(false); // membuat state buka/tutup modal
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null); // State untuk menyimpan ID menu

  const openModal = (id:number) => {
    setBukaMOdal(true);
    setSelectedMenuId(id);
  }
  const closeModal = () => setBukaMOdal(false);
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
    // Isi nilai setValue
    if(activeTab==="All"){
      setMenuReady(await getAllMenuReady());
      setMenuSold(await getAllMenuSold());
    } else if(activeTab==="Makanan"){
      setMenuReady(await filterCategoryReady("Makanan"))
      setMenuSold(await filterCategorySold("Makanan"))
    } else{
      setMenuReady(await filterCategoryReady("Minuman"))
      setMenuSold(await filterCategorySold("Minuman"))
    }
  }
  // BBUat Hook useEffect
  useEffect(() => {
    // Panggil fungsi fetchData
    fetchAllMenu();
  }, [activeTab]);
  return (
    <div className="px-10">
      <div className="max-w-screen-md mx-auto">
        <div className="bg-white py-2 px-3">
          <div className="flex flex-wrap gap-4">
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
          </div>
        </div>
      </div>

      <section className="w-fit mx-auto grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {Object.values(getMenuReady)?.map((datamenu: any, index: number) => (
          <div 
            key={index}
            className="w-40 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={`${datamenu.gambar_menu}`}
              alt="Menu"
              className="h-40 w-40 object-cover rounded-t-xl"
              onClick={() =>{openModal(datamenu.id)}}
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
                <FontAwesomeIcon
                  icon={faCartPlus}
                  width={30}
                  height={30}
                  className="ml-auto"
                ></FontAwesomeIcon>
              </div>
            </div>
          </div>
        ))}
        {Object.values(getMenuSold)?.map((datamenusold: any, index: number) => (
          <div
            key={index}
            className="w-40 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={`${datamenusold.gambar_menu}`}
              alt="Menu"
              className="h-40 w-40 object-cover rounded-t-xl grayscale"
            />
            <div className="px-4 py-3 w-40">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                {datamenusold.kategori}
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                {datamenusold.nama}
              </p>
              <div className="flex items-center">
                <p className="text-xs font-normal text-black cursor-auto my-3">
                  {datamenusold.ketersediaan}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>





       {/* Membuat modal komponen */}
       {isBukaModal && selectedMenuId !== null && (
        <div onClick={handleOverlayClick} className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 relative">
            <div className="flex justify-end">
              <FontAwesomeIcon
                icon={faXmark}
                className="ml-auto mb-2"
                onClick={closeModal}
              ></FontAwesomeIcon>
            </div>
            <DetailMenu id={selectedMenuId}></DetailMenu>
          </div>
        </div>
      )}
    </div>
  );
}
