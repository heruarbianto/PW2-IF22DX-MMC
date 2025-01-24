'use server';
import { PrismaClient } from "@prisma/client";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

const prisma = new PrismaClient();

// Total pendapatan
export const getTotalPendapatan = async () => {
  const pendapatan = await prisma.tb_pemesanan.aggregate({
    _sum: { total: true },
    where: { status: "SELESAI" },
  });
  return pendapatan._sum.total || 0;
};

// Laporan harian
export const getLaporanHarian = async () => {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  const laporanHarian = await prisma.tb_pemesanan.aggregate({
    _sum: { total: true },
    where: {
      createdAt: { gte: todayStart, lte: todayEnd },
      status: "SELESAI",
    },
  });

  return laporanHarian._sum.total || 0;
};

// Laporan mingguan
export const getLaporanMingguan = async () => {
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());

  const laporanMingguan = await prisma.tb_pemesanan.aggregate({
    _sum: { total: true },
    where: {
      createdAt: { gte: weekStart, lte: weekEnd },
      status: "SELESAI",
    },
  });

  return laporanMingguan._sum.total || 0;
};

// Laporan bulanan
export const getLaporanBulanan = async () => {
  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());

  const laporanBulanan = await prisma.tb_pemesanan.aggregate({
    _sum: { total: true },
    where: {
      createdAt: { gte: monthStart, lte: monthEnd },
      status: "SELESAI",
    },
  });

  return laporanBulanan._sum.total || 0;
};

// Grafik pendapatan harian
export const getDataGrafikPendapatanHarian = async () => {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  const laporanHarian = await prisma.tb_pemesanan.groupBy({
    by: ["updatedAt"],
    _sum: { total: true },
    where: {
      updatedAt: { gte: todayStart, lte: todayEnd },
      status: "SELESAI",
    },
    orderBy: { updatedAt: "asc" },
  });

  return laporanHarian.map((entry) => ({
    tanggal: entry.updatedAt,
    pendapatan: entry._sum.total || 0,
  }));
};

// Grafik pendapatan bulanan
export const getDataGrafikPendapatanBulanan = async () => {
  const monthStart = startOfMonth(new Date());
  const monthEnd = endOfMonth(new Date());

  const laporanBulanan = await prisma.tb_pemesanan.groupBy({
    by: ["updatedAt"],
    _sum: { total: true },
    where: {
      updatedAt: { gte: monthStart, lte: monthEnd },
      status: "SELESAI",
    },
    orderBy: { updatedAt: "asc" },
  });

  return laporanBulanan.map((entry) => ({
    tanggal: entry.updatedAt,
    pendapatan: entry._sum.total || 0,
  }));
};

// Grafik pendapatan mingguan
export const getDataGrafikPendapatanMingguan = async () => {
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());

  const laporanMingguan = await prisma.tb_pemesanan.groupBy({
    by: ["updatedAt"],
    _sum: { total: true },
    where: {
      updatedAt: { gte: weekStart, lte: weekEnd },
      status: "SELESAI",
    },
    orderBy: { updatedAt: "asc" },
  });

  return laporanMingguan.map((entry) => ({
    tanggal: entry.updatedAt.toISOString().split("T")[0],
    pendapatan: entry._sum.total || 0,
  }));
};

// Fungsi untuk mendapatkan jumlah pemesanan
export const getJumlahPemesanan = async () => {
    const jumlahPemesanan = await prisma.tb_pemesanan.count({
      where: {
        status: "SELESAI",
      },
    });
  
    return jumlahPemesanan;
  };