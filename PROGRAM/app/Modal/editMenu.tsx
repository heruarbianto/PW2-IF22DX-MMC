"use client";
import React, { useEffect, useState } from "react";
import { menuDetail, updateMenu } from "../models/modelMenu";
interface MenuDetail {
  gambar_menu: string;
  nama: string;
  kategori: string;
  harga: string;
  deskripsi: string;
  ketersediaan: string;
}
interface MenuDetailProps {
  id: number; // Tambahkan properti id
}
export default function editMenu({ id }: MenuDetailProps) {
  // membuat hook useState
  const [getDetail, setDetail] = useState<Partial<MenuDetail>>({});
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [ketersediaan, setKetersediaan] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);
  const FILE_TYPE: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/webp": ".webp",
    "image/png": ".png",
    // Tambahkan tipe lain jika diperlukan
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Selected file:", file); // Log untuk memastikan file ada
    if (file) {
      const fileType = file.type.split("/")[0]; // Mengambil tipe MIME (misal image/png -> "image")
      if (fileType === "image") {
        setGambar(file); // Simpan gambar jika valid
      } else {
        alert("Please select an image file only.");
        e.target.value = "";
        setGambar(null);
      }
    }
  };
  // buat fungsi untuk respon detail menu
  const fetchDetail = async () => {
    // isi setDetail
    const datamenu: any = await menuDetail(id);
    setDetail(datamenu);
    // Set state berdasarkan data yang diterima
    setNama(datamenu.nama);
    setKategori(datamenu.kategori);
    setKetersediaan(datamenu.ketersediaan);
    setHarga(datamenu.harga);
    setDeskripsi(datamenu.deskripsi);
  };

  const fetchPutMenu = async () => {
    if (gambar && gambar instanceof File) {
      // Mengubah gambar menjadi Buffer
      const arrayBuffer = await gambar.arrayBuffer();
      const fileBuffer = Buffer.from(arrayBuffer);
      const base64File = fileBuffer.toString("base64"); // Convert Buffer to Base64 string
  
      const extension = FILE_TYPE[gambar.type];
      const fileName = `${nama.split(" ").join("-")}-${Date.now()}${extension}`;
  
      // Panggil fungsi untuk menyimpan menu
      await updateMenu(
        id,
        nama,
        kategori,
        Number(harga),
        base64File,
        fileName,
        deskripsi,
        ketersediaan
      );
    } else {
      // Jika tidak ada gambar baru, panggil updateMenu tanpa base64File dan fileName
      await updateMenu(
        id,
        nama,
        kategori,
        Number(harga),
        null,
        null,
        deskripsi,
        ketersediaan
      );
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload default form
  
    // Validasi input
    if (!nama || !kategori || !harga || !ketersediaan) {
      alert("Semua input harus diisi!");
      return;
    }
  
    // Panggil fetchPutMenu untuk menyimpan data
    await fetchPutMenu();
  
    // Reload halaman setelah data berhasil disubmit
    window.location.assign("../DashboardAdmin");
  
    // Reset form setelah submit berhasil (optional)
    setNama("");
    setKategori("MINUMAN");
    setKetersediaan("READY");
    setHarga("");
    setDeskripsi("");
    setGambar(null);
  };
  

  useEffect(() => {
    fetchDetail(); 
  }, [id]);
  return (
    <div className="tracking-wide mx-auto font-sans">
      <form onSubmit={handleSubmit}>
        <div className="bg-white md:min-h-[600px] grid items-start grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-full">
            <div className="p-4 relative h-full flex flex-col items-center justify-center gap-4">
              {/* Display gambar atau pratinjau */}
              {gambar ? (
                <img
                  src={URL.createObjectURL(gambar)}
                  alt="Preview"
                  className="lg:w-4/5 w-full h-auto rounded-xl object-contain"
                />
              ) : (
                <img
                  src={getDetail.gambar_menu}
                  alt="Product"
                  className="lg:w-4/5 w-full h-auto rounded-xl object-contain"
                />
              )}

              {/* Input file untuk upload gambar */}
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-sky-600 via-sky-600 to-sky-700 py-6 px-8 h-full">
            <div>
              <label className="text-white block mb-2">Nama</label>
              <input
                type="text"
                name="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full bg-gray-100 px-4 py-2 rounded-md mb-4"
                required
              />

              <label className="text-white block mb-2">Kategori</label>
              <select
                name="kategori"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full bg-gray-100 px-4 py-2 rounded-md mb-4"
              >
                <option value="MINUMAN">Minuman</option>
                <option value="MAKANAN">Makanan</option>
              </select>
            </div>

            <div className="flex flex-wrap justify-between mt-2.5">
              <label className="text-white block mb-2">Harga</label>
              <input
                type="number"
                name="harga"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                className="w-full bg-gray-100 px-4 py-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="text-white block mt-4 mb-2">Deskripsi</label>
              <textarea
                name="deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className="w-full bg-gray-100 px-4 py-2 rounded-md"
              />
              <label className="text-white block mb-2">Ketersediaan</label>
              <select
                name="ketersediaan"
                value={ketersediaan}
                onChange={(e) => setKetersediaan(e.target.value)}
                className="w-full bg-gray-100 px-4 py-2 rounded-md mb-4"
              >
                <option value="READY">Ready</option>
                <option value="SOLDOUT">Sold Out</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                type="submit"
                className="min-w-[200px] px-4 py-3.5 bg-gray-800 hover:bg-gray-900 text-white text-base rounded"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
