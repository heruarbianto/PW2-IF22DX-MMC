"use server";
import { PrismaClient, kategori } from "@prisma/client";
import fs from 'fs';
import path from 'path';


const prisma = new PrismaClient();

// fungsi untuk detail mennu
export const menuDetail = async (idParameter: number) => {
  const detail = await prisma.tb_menu.findUnique({
    where: {
      id: idParameter,
    },
  });
  return detail;
};

// fungsi untuk menampilkan semua menu
export const getAllMenu = async () => {
  // Membuat Variabel menu
  const menu = await prisma.tb_menu.findMany({});
  return menu;
};
// buat fungsi untuk filter menu berdasarkan kategori
export const filterCategory = async (category: string) => {
  const tempCategory = category.toUpperCase();
  const filterMenu = await prisma.tb_menu.findMany({
    where: {
      kategori: tempCategory as "MAKANAN" | "MINUMAN",
    },
  });
  
  return filterMenu;
};

const saveFile = async (base64Data: string, fileName: string): Promise<string> => {
  const uploadDir = path.join(process.cwd(), 'public/imageMenu'); // Direktori penyimpanan file

  // Pastikan folder target ada atau buat jika belum ada
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);
  const buffer = Buffer.from(base64Data, 'base64')
  // Ubah Buffer ke Uint8Array agar kompatibel
  const uint8ArrayBuffer = new Uint8Array(buffer);

  // Simpan file dengan fs
  fs.writeFileSync(filePath, uint8ArrayBuffer); // Simpan file ke direktori

  return `/imageMenu/${fileName}`; // Return path relatif untuk database
};


// fungsi tambah menu
export const createMenu = async(
  namaParam: string,
  kategoriParam: string,
  hargaParam:number,
  base64File: string,
  gambarParam:string,
  deskripsiParam:string)=>{

      // Simpan file terlebih dahulu
  const gambarPath = await saveFile(base64File, gambarParam)
  const setMenu = await prisma.tb_menu.create({
    data: {
      nama: namaParam,
      kategori: kategoriParam as "MAKANAN" | "MINUMAN",
      harga: hargaParam,
      gambar_menu: gambarPath,
      deskripsi: deskripsiParam,
    },
  })
  return setMenu;
}
