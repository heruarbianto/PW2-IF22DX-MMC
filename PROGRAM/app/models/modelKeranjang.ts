"use server";
import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient();

// fungsi untuk menampilkan semua menu user
export const KeranjangUser = async () => {
    // Membuat Variabel menu
    const keranjang = await prisma.tb_keranjang.findMany({
      where: {
        idUser: 6,
      },
      include: {
        menu: true, // Untuk fetch data menu
        user: true, // Jika butuh data user
      },
    });
    return keranjang;
  };

  // Buat fungsi tambah plus Keranjang
export const tambahUpdate = async (
  idKeranjang: number,
  quantity: number,
  harga: number) => {
    const plusQuantity = quantity+1;
    const totalHarga = harga*plusQuantity;
    // console.log(plusQuantity,totalHarga)
    await prisma.tb_keranjang.updateMany({
    where: {
      id: idKeranjang
    },
    data: {
      quantity: plusQuantity,
      total: totalHarga,
    },
  });
};

 // Buat fungsi tambah plus Keranjang
 export const kurangUpdate = async (
  idKeranjang: number,
  quantity: number,
  harga: number) => {
    const plusQuantity = quantity-1;
    const totalHarga = harga*plusQuantity;
    // console.log(plusQuantity,totalHarga)
    await prisma.tb_keranjang.updateMany({
    where: {
      id: idKeranjang
    },
    data: {
      quantity: plusQuantity,
      total: totalHarga,
    },
  });
};

 // Buat fungsi tambah plus Keranjang
 export const deleteKeranjang = async (
  idKeranjang: number) => {
    await prisma.tb_keranjang.deleteMany({
      where: {
        id: idKeranjang,
      },
    })
};
   