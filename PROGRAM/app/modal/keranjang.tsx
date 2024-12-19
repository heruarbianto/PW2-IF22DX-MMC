"use client";
import React, { useEffect, useState } from "react";
import {
  deleteKeranjang,
  KeranjangUser,
  kurangUpdate,
  tambahUpdate,
} from "../models/modelKeranjang";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent } from "react";
export default function keranjang() {
  const [getIsiCart, setIsiCart] = useState({});
  const [getKeranjang, setKeranjang] = useState(getIsiCart);
  const [getidDelete, setidDelete] = useState<number>();
  // ambil data dari database
  const fetchKeranjangUser = async () => {
    const data = await KeranjangUser();
    // console.log("Data Keranjang:", data); // Debugging
    setIsiCart(data);
  };

  // delete data
  const fetchDelete = async () => {
    await deleteKeranjang(getidDelete as number);
    // console.log("Data Keranjang:", data); // Debugging
    setidDelete(0);
    location.reload()
  };

  useEffect(() => {
    fetchKeranjangUser();
  }, []);

  useEffect(() => {
    setKeranjang(getIsiCart);
  }, [getIsiCart]);

  const updatetambahQuantity = async (
    idKeranjangg: number,
    quantity: number,
    hargaMenu: number
  ) => {
    await tambahUpdate(idKeranjangg, quantity, hargaMenu);
    setKeranjang((prevKeranjang: any[]) => {
      const updatedKeranjang = [...prevKeranjang];

      // Cari indeks berdasarkan ID
      const index = updatedKeranjang.findIndex(
        (item) => item.id === idKeranjangg
      );
      if (index !== -1) {
        const updatedQuantity = quantity + 1;

        // Update quantity dan total harga
        updatedKeranjang[index] = {
          ...updatedKeranjang[index],
          quantity: updatedQuantity,
          total: hargaMenu * updatedQuantity,
        };
      }

      return updatedKeranjang;
    });
  };

  const updatekurangQuantity = async (
    namaMenu: string,
    idKeranjangg: number,
    quantity: number,
    hargaMenu: number
  ) => {
    // Menghitung kuantitas baru setelah dikurangi
    const updatedQuantity = quantity - 1;

    // Jika kuantitas setelah dikurangi kurang dari 1, tampilkan modal dan hentikan proses
    if (updatedQuantity < 1) {
      setidDelete(idKeranjangg);
      const element = document.getElementById("namaMenu") as HTMLHeadingElement;
      if (element) {
        element.innerText = namaMenu;
      }

      const modal = document.getElementById("deleteMenu") as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
      return; // Hentikan eksekusi fungsi jika quantity kurang dari 1
    }

    // Jika quantity valid, lakukan update ke database
    await kurangUpdate(idKeranjangg, quantity, hargaMenu);

    // Update state keranjang
    setKeranjang((prevKeranjang: any[]) => {
      const updatedKeranjang = [...prevKeranjang];

      // Cari indeks berdasarkan ID
      const index = updatedKeranjang.findIndex(
        (item) => item.id === idKeranjangg
      );

      if (index !== -1) {
        // Update quantity dan total harga
        updatedKeranjang[index] = {
          ...updatedKeranjang[index],
          quantity: updatedQuantity,
          total: hargaMenu * updatedQuantity,
        };
      }

      return updatedKeranjang;
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Keranjang Belanja</h1>
        <input
          type="text"
          placeholder="Cari Produk"
          className="border rounded p-2 w-full sm:w-1/3"
        />
      </div>

      {/* Cart Items */}
      <div className="mt-4">
        {Object.values(getKeranjang).map((dataKeranjang: any) => (
          <div
            key={dataKeranjang.id}
            className="border rounded-lg p-4 mb-4 bg-white shadow-md"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Checkbox */}
              <input type="checkbox" className="self-start" />

              {/* Product Image */}
              <img
                src={dataKeranjang.menu.gambar_menu}
                alt={dataKeranjang.menu.nama}
                className="w-20 h-20 object-cover rounded-lg"
              />

              {/* Product Details */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="font-semibold text-gray-800">
                  {dataKeranjang.menu.nama}
                </h2>
                <p className="text-sm text-gray-500">
                  {dataKeranjang.menu.kategori}
                </p>
                <p className="text-sm text-gray-500">
                  Rp{dataKeranjang.menu.harga?.toLocaleString("id-ID")}
                </p>
              </div>
              {/* Quantity and Price */}
              <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
                <div className="flex items-center rounded w-full px-2">
                  <button
                    type="button"
                    onClick={() => {
                      updatekurangQuantity(
                        dataKeranjang.menu.nama,
                        dataKeranjang.id,
                        dataKeranjang.quantity,
                        dataKeranjang.menu.harga
                      );
                    }}
                    className="bg-transparent text-gray font-semibold flex items-center justify-center px-2"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>

                  <p className="flex items-center text-sm text-gray-500 mx-2">
                    x{dataKeranjang.quantity}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      updatetambahQuantity(
                        dataKeranjang.id,
                        dataKeranjang.quantity,
                        dataKeranjang.menu.harga
                      );
                    }}
                    className="bg-transparent text-gray font-semibold flex items-center justify-center px-2"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-5">
              {/* Hapus */}
              <button className="text-red-500 hover:underline">Hapus</button>
              <p className="font-bold text-gray-800">
                Rp{dataKeranjang.total?.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-4 gap-4">
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          <span className="text-gray-700">Pilih Semua |</span>
          <button className="text-red-500 hover:underline">Hapus</button>
        </div>
        <div className="text-gray-800">
          <span>Total (2 Produk):</span>
          <span className="ml-2 font-bold text-blue-600">Rp99.100</span>
        </div>
        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition duration-200 w-full sm:w-auto">
          Checkout
        </button>
      </div>

      <dialog id="deleteMenu" className="modal">
        <div className="modal-box">
          <div className="flex justify-end">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
          <div className="my-8 text-center">
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="size-20 text-red-500"
            ></FontAwesomeIcon>
            <h4 className="text-gray-800 text-lg font-semibold mt-4">
              Apakah Kamu Yakin Ingin Menghapus Menu <span id="namaMenu"></span>{" "}
              Dari Keranjang?
            </h4>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={fetchDelete}
              className="px-4 py-2 rounded-lg text-white text-sm tracking-wide bg-red-500 hover:bg-red-600 active:bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
