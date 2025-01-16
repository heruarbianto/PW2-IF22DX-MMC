"use server";
import {PrismaClient} from "@prisma/client";
import { updateSetelahDipesan } from "./modelKeranjang";

const prisma = new PrismaClient();

// fungsi untuk menampilkan semua menu
export const getAllMeja = async () => {
    // Membuat Variabel menu
    const meja = await prisma.tb_meja.findMany({});
    return meja;
  };

  // Fungsi untuk membuat pesanan
export const buatPesanan = async (
    idUserparameter: number,
    idMejaparameter: number,
    metodepembayaran: string,
    totalparameter: number,
    totalProdukparameter:number
  ): Promise<number> => {
    try {
      // Validasi input
      if (!idUserparameter || !idMejaparameter || !totalparameter || totalparameter <= 0) {
        throw new Error('Input data tidak valid.');
      }
  
      if (!['COD', 'ePayment'].includes(metodepembayaran)) {
        throw new Error('Metode pembayaran tidak valid.');
      }
  
      // Membuat data pesanan di database
      const pesanan = await prisma.tb_pemesanan.create({
        data: {
          idUser: idUserparameter,
          idMeja: idMejaparameter,
          metode: metodepembayaran as 'COD' || 'ePayment',
          pajak: '11%', // Pajak dalam bentuk desimal
          total: totalparameter,
          totalProduk: totalProdukparameter
        },
      });
  
      return pesanan.id;
    } catch (error:any) {
      console.error('Gagal membuat pesanan:', error.message);
    throw new Error('Gagal membuat pesanan. Silakan coba lagi.');
    }
  };
  
// Fungsi untuk menambahkan detail pesanan
export const tambahDetailPesanan = async (
    idPemesananparameter: number,
    idKeranjangArray: number[],
    notesParameter: Record<number, string>
  ): Promise<void> => {
    try {
      // Validasi input
      if (!idPemesananparameter || !Array.isArray(idKeranjangArray) || idKeranjangArray.length === 0) {
        throw new Error('Input tidak valid. Pastikan ID pemesanan dan array ID keranjang valid.');
      }
  
      // Iterasi array idKeranjang dan masukkan ke database
      const detailPesananPromises = idKeranjangArray.map((idKeranjang) =>
        prisma.detail_pemesanan.create({
          data: {
            idPemesanan: idPemesananparameter,
            idKeranjang: idKeranjang,
            note: notesParameter[idKeranjang] || '',
          },
        })
      );
  
      // Tunggu semua operasi selesai
      await Promise.all(detailPesananPromises);
  
      console.log(`Detail pesanan berhasil ditambahkan untuk ID pemesanan ${idPemesananparameter}`);
    } catch (error:any) {
      console.error('Gagal menambahkan detail pesanan:', error.message);
      throw new Error('Gagal menambahkan detail pesanan. Silakan coba lagi.');
    }
  };
  
  // Fungsi untuk memproses pesanan
export const prosesPesanan = async (
    idUser: number,
    idMeja: number,
    metodePembayaran: string,
    total: number,
    idKeranjang: number[], // Menyertakan keranjang untuk detail pesanan
    notesParameter: Record<number, string>,
    totalProduk:number

  ): Promise<{ success: boolean; message: string }> => {
    try {
      // Membuat pesanan terlebih dahulu
      const idPesanan = await buatPesanan(idUser, idMeja, metodePembayaran, total,totalProduk);
      // Validasi jika pesanan gagal dibuat
      if (idPesanan === 0) {
        throw new Error('Gagal membuat pesanan utama. Proses dihentikan.');
      }
  
      // Menambahkan detail pesanan
      await tambahDetailPesanan(idPesanan, idKeranjang,notesParameter);
      
      // Jika semua berhasil
      return { success: true, message: `Pesanan berhasil dibuat dengan ID ${idPesanan}.` };
  
    } catch (error:any) {
      console.error('Error dalam memproses pesanan:', error.message);
      return { success: false, message: error.message };
    }
  };
  