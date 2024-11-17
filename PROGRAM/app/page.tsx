import { PrismaClient } from "@prisma/client";
import React from "react";

const prisma = new PrismaClient();
export default async function MainPage() {
  // Membuat Variabel menu
  const menu = await prisma.tb_menu.findMany({});
  return (
     <div>
      {menu?.map((datamenu: any, index: number)=>(
        <div key={index}>{datamenu.id} {datamenu.nama} {datamenu.deskripsi} {datamenu.harga.toString()} {datamenu.kategori} {datamenu.gambar_menu}  </div>
      ))}
    </div>
  );
}
