"use client"
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { getAllMenu } from "./models/modelMenu";


export default function MainPage() {
  //  Buat Hook useState
  const [getMenu, setMenu] = useState({})

  // Buat Fungsi untuk respon getAllMenu
  async function fetchAllMenu() {
    
    // Isi nilai setValue
    setMenu(await getAllMenu())
  }

    // BBUat Hook useEffect
    useEffect(() => {
      // Panggil fungsi fetchData
      fetchAllMenu();
    }, [])
  return (
    <div>
        <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {Object.values(getMenu)?.map((datamenu: any, index: number) => (
          <div key={index} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        
          <img src={`${datamenu.gambar_menu}`}
                  alt="Menu" className="h-80 w-72 object-cover rounded-t-xl" />
          <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">{datamenu.kategori}</span>
              <p className="text-lg font-bold text-black truncate block capitalize">{datamenu.nama}</p>
              <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">Rp. {datamenu.harga.toString()}</p>
                  <FontAwesomeIcon icon={faCartPlus} width={30} height={30} className='ml-auto'>
                  </FontAwesomeIcon>
              </div>
          </div>
      
  </div>
      ))}
        </section>
      </div>

  );
}
