"use client";
import React, { useState } from "react";
import {createMenu } from "../models/modelMenu";


export default function tambahMenu() {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("MINUMAN");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState<Partial<File>>();
  const FILE_TYPE: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    // Tambahkan tipe lain jika diperlukan
  };
    // Fungsi untuk respon create menu
const fetchsetMenu = async () => {
    if (gambar && gambar instanceof File) {
        // Mengubah gambar menjadi Buffer
        const arrayBuffer = await gambar.arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);
        const base64File = fileBuffer.toString('base64'); // Convert Buffer to Base64 string

        const extension = FILE_TYPE[gambar.type];
        // Menangani nama file
        const fileName = `${nama.split(' ').join('-')}-${Date.now()}${extension}`;
        // Panggil fungsi untuk menyimpan menu
        await createMenu(nama, kategori, Number(harga), base64File, fileName, deskripsi);
    }
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('Selected file:', file); // Log untuk memastikan file ada
    if (file) {
        const fileType = file.type.split("/")[0]; // Mengambil tipe MIME (misal image/png -> "image")
      if (fileType === "image") {
          setGambar(file); // Simpan gambar jika valid
        } else {
            alert("Please select an image file only.");
            e.target.value = "";
            setGambar(undefined);
        }
    }
};


const handleSubmit = async (e: React.FormEvent) => {
    // Reload halaman setelah data berhasil disubmit
  window.location.assign("../DashboardAdmin");
    // Panggil fetchsetMenu untuk menyimpan data
    await fetchsetMenu();
    
    // Reset form setelah submit berhasil (optional)
    setNama("");
    setKategori("MINUMAN");
    setHarga("");
    setDeskripsi("");
    setGambar(undefined);
  };

  return (
    <div className="tracking-wide mx-auto font-sans">
      <form className="bg-white md:min-h-[600px] grid items-start grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
        <div className="h-full">
          <div className="p-4 relative h-full flex items-center justify-center">
            <input
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleFileChange}
              required
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-sky-600 via-sky-600 to-sky-700 py-6 px-8 h-full">
          <div>
            <input
              type="text"
              placeholder="Ayam Bakar Sambal"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full bg-gray-100 px-4 py-2 rounded-md text-lg font-semibold mb-4"
              required
            />
            <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="w-full bg-gray-100 px-4 py-2 rounded-md text-sm mb-4"
          required
        >
          <option value="MINUMAN">Minuman</option>
          <option value="MAKANAN">Makanan</option>
          </select>
          </div>

          <div className="flex flex-wrap gap-4 justify-between mt-8">
            <input
              type="number"
              placeholder="Harga"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              className="w-full bg-gray-100 px-4 py-2 rounded-md text-4xl text-gray-800"
              required
            />
          </div>

          <div>
            <ul className="grid grid-cols-3 mt-8">
              <li className="text-white text-base w-full py-3.5 px-2 text-center border-b-2 border-white">
                Deskripsi
              </li>
            </ul>
            <textarea
              placeholder="Deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full bg-gray-100 px-4 py-2 rounded-md text-base mt-4 text-gray-800"
              required
            ></textarea>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              type="submit"
              className="min-w-[200px] px-4 py-3.5 bg-blue-800 hover:bg-blue-900 text-white text-base rounded"
            >
              Tambah Menu
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
