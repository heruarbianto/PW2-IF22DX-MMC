"use server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const ubahStatusPemesanan = async (pemesananIds: number[]) => {
    // Query ke database untuk memvalidasi pemesanan
    const pemesanan = await prisma.tb_pemesanan.findMany({
      where: {
        id: {
          in: pemesananIds, // Memastikan ID pemesanan termasuk dalam array yang diberikan
        },
      },
    });
  
    // Periksa apakah jumlah pemesanan yang valid sama dengan jumlah ID yang diminta
    if (pemesanan.length !== pemesananIds.length) {
      throw new Error('Beberapa ID pemesanan tidak valid.');
    }
  
    // Update status untuk ID yang valid
    const updateResult = await prisma.tb_pemesanan.updateMany({
      where: {
        id: {
          in: pemesananIds, // Update hanya untuk ID yang valid
        },
      },
      data: {
        status: "DIPROSES", // Ubah ke status "DIPROSES"
      },
    });
  
    // Kembalikan hasil pembaruan
    return updateResult;
  };