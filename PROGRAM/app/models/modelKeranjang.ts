"use server";
import {PrismaClient} from "@prisma/client";
import { getAllMenu } from "./modelMenu";


const prisma = new PrismaClient();

// fungsi untuk menampilkan semua menu user
export const KeranjangUser = async (usrId:number) => {
    // Membuat Variabel menu
    const keranjang = await prisma.tb_keranjang.findMany({
      where: {
        idUser: usrId,
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

 // Buat fungsi tambah item ke Keranjang
 export const tambahKeKeranjang = async (
  idUserParameter: number,
  idMenuParameter: number,
  quantityParameter: number,
  hargaMenuParameter:number) => {

    const dataKeranjang = await prisma.tb_keranjang.findMany({
      include:{
        user: true,
        menu: true
      }
    });
    // Menggunakan find untuk mencari Keranjang berdasarkan idUser dan IdMenu
    const idUSerMenuFound = dataKeranjang.find((cart) => cart.idUser === idUserParameter && cart.idMenu=== idMenuParameter);
    

    //Jika ada ditemukan keranjang dengan item idUser dan IdMenu yang sama maka update item di keranjang
    if(idUSerMenuFound){
      // Lakukan edit
      // ambil data kuantity lama
      const quantityOld = idUSerMenuFound.quantity
      // ambil data harga menu dari table menu
      const hargaMenu = idUSerMenuFound.menu.harga
      // quantity lama ditambah quantity  baru
      const newQuantity = quantityParameter + quantityOld
      await prisma.tb_keranjang.updateMany({
        where: {
          idUser: idUserParameter,
          idMenu: idMenuParameter
        },
        data: {
          quantity: newQuantity,
          total: newQuantity*hargaMenu,
        },
      });

    }else{
      await prisma.tb_keranjang.create({
      data: {
        idUser: idUserParameter,
        idMenu: idMenuParameter,
        quantity: quantityParameter,
        total: hargaMenuParameter*quantityParameter,
      },
    });// tambah item ke keranjang
    }
};
   