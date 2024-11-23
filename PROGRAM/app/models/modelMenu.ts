"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// fungsi untuk detail mennu
export const menuDetail = async () => {
  const detail = await prisma.tb_menu.findUnique({
    where: {
      id: 2,
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
