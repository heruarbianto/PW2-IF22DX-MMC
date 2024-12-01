"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// fungsi untuk create User(Pelanggan)
export const RegisPelanggan = async (
  namaLengkapParam: string,
  usernameParam: string,
  noTelpParam: string,
  emailParam: string,
  passwordParam: string,
  alamatParam: string
) => {
  const dataUser = await prisma.tb_user.findMany({});
  // Menggunakan find untuk mencari user berdasarkan email dan no hp
  const emailFound = dataUser.find((user) => user.email === emailParam);
  const noTelpFound = dataUser.find((user) => user.noHp=== noTelpParam);
  const usernameFound = dataUser.find((user) => user.username === usernameParam);

      if(usernameFound){
        return "Username Telah Digunakan"
    }else if(emailFound){
        return "Email Telah Digunakan"
    }else if (noTelpFound){
        return "No. Telp Telah Digunakan"
    }else{
    await prisma.tb_user.create({
      data: {
        namaLengkap: namaLengkapParam,
        username: usernameParam,
        noHp: noTelpParam,
        email: emailParam,
        password: passwordParam,
        alamat: alamatParam,
        role: "PELANGGAN",
      },
    });
    return "Register Telah Berhasil";
  }
};
