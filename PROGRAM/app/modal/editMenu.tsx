"use client";
import React, { useEffect, useState } from "react";
import { menuDetail, updateMenu, deleteMenu } from "../models/modelMenu";
import Link from "next/link";
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
  // State untuk mengontrol apakah modal terbuka atau tertutup (Verify delete)
  const [isModalVerifyDelete, setIsModalVerifyDelete] = useState(false);

  // Fungsi untuk membuka modal
  const openModal = () => {
      setIsModalVerifyDelete(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
      setIsModalVerifyDelete(false);
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
   const fetchDeleteMenu = async()=>{
      await deleteMenu(id);
   }
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
   const deleteHandler = async() =>{
    await fetchDeleteMenu();
    window.location.assign("../dashboardadmin");

   }
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
    window.location.assign("../dashboardadmin");
    
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
                className="min-w-[100px] px-4 py-3.5 bg-gray-800 hover:bg-gray-900 text-white text-base rounded"
              >
                Simpan Perubahan
              </button>
              <Link href={"#"}
                className="min-w-[100px] px-4 py-3.5 bg-red-800 hover:bg-red-900 text-white text-base rounded"
                onClick={openModal}
              >
                Delete Menu
              </Link>
            </div>
          </div>
        </div>
      </form>
      {isModalVerifyDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                <button
                                    onClick={deleteHandler}
                                    type="button"
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                >
                                    Yes, I'm sure
                                </button>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
    </div>
  );
}
