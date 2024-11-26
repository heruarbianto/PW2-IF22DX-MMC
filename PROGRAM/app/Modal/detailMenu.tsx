"use client"
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent } from "react";
import { menuDetail } from "../models/modelMenu";

interface MenuDetail {
  gambar_menu: string;
  nama: string;
  kategori: string;
  harga: number;
  deskripsi: string;
}
interface MenuDetailProps {
  id: number; // Tambahkan properti id
}

export default function detailMenu({id}: MenuDetailProps) {
  // membuat hook useState
  const [getDetail, setDetail] = useState<Partial<MenuDetail>>({});
  const [value, setValue] = useState(1);
  // Fungsi untuk menambah nilai
  const increment = () => setValue((prevValue) => prevValue + 1);
  // Fungsi untuk mengurangi nilai, tidak kurang dari 0
  const decrement = () => setValue((prevValue) => Math.max(prevValue - 1, 0));
  // Fungsi untuk menangani perubahan input manual
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value, 10);
    if (!isNaN(inputValue)) {
      setValue(inputValue);
    } else {
      setValue(0); // Reset jika input kosong atau tidak valid
    }
  };

  // buat fungsi untuk respon detail menu
  const fetchDetail = async()=>{
    // isi setDetail
    const datamenu:any = await menuDetail(id);
    setDetail(datamenu)
  }
  useEffect(() => {
    fetchDetail();
  }, [id])
  return (  
            <div className="tracking-wide mx-auto font-sans">
              <div className="bg-white md:min-h-[600px] grid items-start grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-full">
                  <div className="p-4 relative h-full flex items-center justify-center">
                    <img
                      src={getDetail.gambar_menu}
                      alt="Product"
                      className="lg:w-4/5 w-full h-full rounded-xl object-contain"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-sky-600 via-sky-600 to-sky-700 py-6 px-8 h-full">
                  <div>
                    <h2 className="text-3xl font-semibold text-white">
                      {/* {Object.values(getDetail)?.map((detmenu: any, index: number)=>(
                        <div>{detmenu}</div>
                      ))} */}
                      {getDetail.nama}
                    </h2>
                    <p className="text-sm text-gray-200 mt-2">
                      {getDetail.kategori}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 justify-between mt-8">
                    <h3 className="text-white text-4xl">Rp. {getDetail.harga}</h3>
                  </div>

                  <div>
                    <ul className="grid grid-cols-3 mt-8">
                      <li className="text-white text-base w-full py-3.5 px-2 text-center border-b-2 border-white cursor-pointer">
                        Description
                      </li>
                    </ul>
                    <p className="text-gray-300 mt-4 text-base">
                      {getDetail.deskripsi}
                    </p>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-white">
                      Quantity
                    </h3>

                    <div className="flex mt-4 rounded-full overflow-hidden bg-gray-800 py-2.5 px-4 w-32">
                      <button
                        type="button"
                        onClick={decrement}
                        className="bg-transparent w-full text-white font-semibold flex items-center justify-center"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>

                      <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        className="bg-transparent w-full  font-semibold flex items-center justify-center text-white text-base text-center"
                        min="0" // batas bawah
                      />

                      <button
                        type="button"
                        onClick={increment}
                        className="bg-transparent w-full text-white font-semibold flex items-center justify-center"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    <button
                      type="button"
                      className="min-w-[200px] px-4 py-3.5 bg-gray-800 hover:bg-gray-900 text-white text-base rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
  )
}