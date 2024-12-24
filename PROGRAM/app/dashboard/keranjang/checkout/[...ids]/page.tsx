"use client"
import React, { useEffect, useState } from "react";
import Forbidden from "@/app/forbidden/page";
import { jwtDecode } from "jwt-decode";
import { keranjangPemesanan } from "@/app/models/modelKeranjang";
import { DetailUser } from "@/app/models/modelUser";
export default function pageCheckout({
  params,
}: {
  params: { ids: number[] };
}) {
  const idsArray = params.ids.map(Number); //konversi ke number
  // Validasi: Periksa apakah semua elemen dalam array adalah angka valid
  const isValid = idsArray.every((id) => typeof id === "number" && !isNaN(id));
  const [getIdUser, setidUser] = useState({});
  const [getItemKeranjang, setItemKeranjang] = useState({})
  const [isError, setError] = useState("")
  // console.log(idsArray);
  
  const fetchKeranjang = async () => {
    // Ambil token dari cookie
    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];
    
    // Decode token untuk mendapatkan idUser
    const decoded: { userId: number } = jwtDecode(token as string);
    const idUser = decoded.userId;
    setidUser(await DetailUser(idUser))
    try {
      // Panggil fungsi API untuk mengambil data keranjang
      const data = await keranjangPemesanan(idsArray, idUser);
      
      // Jika berhasil, set state dengan data keranjang
      setItemKeranjang(data);
      // console.log("Data keranjang:", data);
    } catch (error: any) {
      // Tangkap error dan tampilkan pesan ke pengguna
      // console.error("Error fetching keranjang:", error.message);
      // alert(`Gagal memuat data keranjang: ${error.message}`);
      setError(error.message)
    }
  };
  
  const calculateTotalPrice = (items: Record<string, any>): number => {
    return Object.values(items).reduce(
      (total, product: any) => total + product.menu.harga * product.quantity,
      0
    );
  };
  
  // Menggunakan fungsi tersebut
  const totalPrice = calculateTotalPrice(getItemKeranjang);
  // console.log(Object.values(getIdUser).map((user:any)=>user.namaLengkap))
  // BBUat Hook useEffect
  useEffect(() => {
    
    fetchKeranjang();
  }, []);
  
  // Jika tidak valid atau ada error, tampilkan Forbidden
  if (!isValid || params.ids.length === 0 || isError) {
    return <Forbidden />;
  }

  
  
  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        {/* Header */}
        <div className="border-b p-4">
          <h1 className="text-xl font-semibold text-gray-700">Checkout</h1>
        </div>

        {/* Address Section */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Detail Pelanggan
          </h2>
          <div className="text-gray-600">
            <p className="font-medium">{Object.values(getIdUser).map((user:any)=>user.namaLengkap)} ({Object.values(getIdUser).map((user:any)=>user.noHp)})</p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="payment-method"
              className="block text-sm text-gray-700 mb-2"
            >
              Pilih Meja:
            </label>
            <select
              id="tempatDuduk"
              className="w-full p-2 border rounded-lg text-gray-700"
            >
              <option value="transfer">Pickup</option>
              <option value="cod">Meja 1</option>
              <option value="ewallet">Meja 2</option>
            </select>
          </div>
        </div>

        {/* Product Section */}
        <div className="p-4 flex-grow overflow-y-auto max-h-[calc(100vh-16rem)]">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Produk Dipesan
          </h2>
          <div className="max-h-96 pr-2">
            {Object.values(getItemKeranjang)?.map(
              (dataitem: any, index: number) => (
              <div key={dataitem.id} className="mb-4 border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={dataitem.menu.gambar_menu}
                      alt={dataitem.menu.nama}
                      className="w-16 h-16 rounded-lg mr-4"
                    />
                    <div>
                      <p className="text-gray-700 font-medium">
                        {dataitem.menu.nama}
                      </p>
                      <p className="text-sm text-gray-500">
                        Kategori: {dataitem.menu.kategori}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-700">
                      Rp{dataitem.menu.harga.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Jumlah: {dataitem.quantity}
                    </p>
                  </div>
                </div>
                {/* Input Catatan */}
                <div className="mt-2">
                  <label
                    htmlFor={`note-${dataitem.id}`}
                    className="block text-sm text-gray-600"
                  >
                    Catatan untuk produk:
                  </label>
                  <input
                    id={`note-${dataitem.id}`}
                    type="text"
                    placeholder="Tambahkan catatan (opsional)"
                    className="w-full mt-1 p-2 border rounded-lg text-gray-700"
                  />
                </div>
                {/* Total Section per Produk */}
                <div className="mt-4 bg-gray-100 p-2 rounded-lg">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-700">
                      Total untuk Produk:
                    </p>
                    <p className="text-sm font-semibold text-red-600">
                      Rp{(dataitem.menu.harga * dataitem.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Total Section */}
        <div className="p-4 bg-gray-100 sticky bottom-0 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-medium text-gray-700">
              Total Keseluruhan:
            </p>
            <p className="text-lg font-semibold text-red-600">
              Rp{totalPrice.toLocaleString()}
            </p>
          </div>
          {/* Metode Pembayaran */}
          <div className="mb-4">
            <label
              htmlFor="payment-method"
              className="block text-sm text-gray-700 mb-2"
            >
              Pilih Metode Pembayaran:
            </label>
            <select
              id="payment-method"
              className="w-full p-2 border rounded-lg text-gray-700"
            >
              <option value="transfer">Transfer Bank</option>
              <option value="cod">Bayar di Tempat (COD)</option>
              <option value="ewallet">E-Wallet</option>
            </select>
          </div>
          {/* Tombol Pesan */}
          <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700">
            Pesan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
