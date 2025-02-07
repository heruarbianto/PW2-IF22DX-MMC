"use server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

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
  const dataUser = await prisma.tb_user.findMany({
    select:{
      email:true,
      noHp:true,
      username:true,
    }
  });
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


export const LoginUser= async (
  usernameParam: string,
  passwordParam: string
) => {
  // Cari user berdasarkan username
  const user = await prisma.tb_user.findFirst({
    where: { username: usernameParam },
  });

  // Validasi username dan password secara umum
  if (!user || user.password !== passwordParam) {
    return "Username/Password Salah";
  }

  // Jika username dan password cocok
   // Membuat token dengan JWT
   const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: "20m" });
  return token;
};

export const DetailUser= async(idUserParameter: number)=>{
  const user = await prisma.tb_user.findMany({
    where: {
      id : idUserParameter
    },
    select:{
      namaLengkap:true,
      username: true,
      noHp: true,
      email: true
    }
  })
  return user;
}

export const updateUser = async (userId: number, updatedData: any) => {
  const { namaLengkap, email, username, noHp } = updatedData;

  try {
    await prisma.tb_user.update({
      where: { id: userId },
      data: {
        namaLengkap,
        email,
        username,
        noHp,
      },
    });
    return "success";
  } catch (error) {
    console.error(error);
    return "error";
  }
};

export async function getAllUsers() {
  try {
    const users = await prisma.tb_user.findMany();
    return users; // Mengembalikan array user
  } catch (error) {
    console.error("Error fetching users:", error);
    return null; // Mengembalikan null jika terjadi kesalahan
  }
}

