import { PrismaClient } from "@prisma/client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const prisma = new PrismaClient();
export default async function MainPage() {
  // Membuat Variabel menu
  const menu = await prisma.tb_menu.findMany({});
  return (
          // <div key={index}>
          //   {datamenu.id} {datamenu.nama} {datamenu.deskripsi}{" "}
          //   {datamenu.harga.toString()} {datamenu.kategori} {datamenu.gambar_menu}{" "}
          // </div>
    <div>
        <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {menu?.map((datamenu: any, index: number) => (
          <div key={index} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        
          <img src={`${datamenu.gambar_menu}`}
                  alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
          <div className="px-4 py-3 w-72">
              <span className="text-gray-400 mr-3 uppercase text-xs">{datamenu.kategori}</span>
              <p className="text-lg font-bold text-black truncate block capitalize">{datamenu.nama}</p>
              <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">Rp. {datamenu.harga}</p>
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
