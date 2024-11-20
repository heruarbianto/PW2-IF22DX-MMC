"use server"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// fungsi untuk detail mennu
export const menuDetail = async()=>{
    const detail = await prisma.tb_menu.findUnique({
      where: {
        id: 2,
      },
    })
    return {
        ...detail,
        harga: detail?.harga.toNumber(),
    }
  }