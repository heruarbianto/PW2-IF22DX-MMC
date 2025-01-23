"use server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// fungsi untuk menampilkan semua meja
export const getAllMeja = async () => {
    // Membuat Variabel menu
    const meja = await prisma.tb_meja.findMany({});
    return meja;
  };

  // fungsi untuk menampilkan semua pesanan
export const getAllPesanan = async (idUserParameter:number) => {
  // Membuat Variabel menu
  const pesanan = await prisma.tb_pemesanan.findMany({
    where:{
      idUser: idUserParameter
    }
  });
  return pesanan;
};

// Backend: Fungsi getAllPesanan tanpa filter
export const getAllPesananNoFilter = async () => {
  const allPesanan = await prisma.tb_pemesanan.findMany(); // Mengambil semua data tanpa filter
  return allPesanan;
};


  // fungsi untuk menampilkan semua pesanan selesai
  export const getPesananSelesai = async (idUserParameter:number) => {
    // Membuat Variabel menu
    const pesanan = await prisma.tb_pemesanan.findMany({
      where:{
        idUser: idUserParameter,
        status: 'SELESAI'
      }
    });
    return pesanan;
  };

export const getAllDetailPesanan = async (idUserParameter:number) => {
  
  const idPesananArr = Object.values(await getPesananSelesai(idUserParameter)).map((pesanan:any)=>{
    return pesanan.id
  })

  // console.log(idPesananArr)
  const pesanan = await prisma.detail_pemesanan.findMany({
    where:{
      idPemesanan:{
        in: idPesananArr
      }
    },
    include:{
      keranjang: true
    }
  });
  return pesanan;
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


    // fungsi untuk menampilkan Pesanan by Id
export const getPesananbyId = async (idPesananParameter:number) => {
  // Membuat Variabel menu
  const pesanan = await prisma.tb_pemesanan.findMany({
    where:{
      id: idPesananParameter
    }
  });
  return pesanan;
};

    // fungsi untuk menampilkan Detail Pesanan by id Pemesanan
    export const getDetailPesananbyId = async (idPemesananParameter:number) => {
      // Membuat Variabel menu
      const detail = await prisma.detail_pemesanan.findMany({
        where:{
          idPemesanan: idPemesananParameter
        },
        include:{
          keranjang: {
            include: {
              menu: true
            }
          }
        }
      });
      return detail;
    };

    export const batalkanPesananOtomatis = async () => {
      try {
        // Hitung waktu 24 jam yang lalu
        const batasWaktu = new Date();
        batasWaktu.setHours(batasWaktu.getHours() - 24);
    
        // Cari pesanan yang memenuhi syarat
        await prisma.tb_pemesanan.updateMany({
          where: {
            status: "MENUNGGUPEMBAYARAN",
            createdAt: {
              lt: batasWaktu,
            },
          },
          data: {
            status: "DIBATALKAN",
          },
        });
    
        // console.log(
        //   `${pesananYangDibatalkan.count} pesanan telah dibatalkan secara otomatis.`
        // );
      } catch (error: any) {
        console.error("Gagal membatalkan pesanan secara otomatis:", error.message);
      }
    };
    
    // Jalankan fungsi secara periodik setiap 30 detik
    setInterval(batalkanPesananOtomatis, 30000);