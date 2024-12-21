"use client";
import { useEffect, useState } from "react";
import {
  KeranjangUser,
  kurangUpdate,
  tambahUpdate,
} from "../models/modelKeranjang";
import keranjang from "../modal/keranjang";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const [getIsiCart, setIsiCart] = useState({});
  const [getKeranjang, setKeranjang] = useState(getIsiCart);

  // const fetchKeranjangUser = async () => {
  //   // const data = await KeranjangUser();
  //   console.log("Data Keranjang:", data); // Debugging
  //   setIsiCart(data);
  // };

  // useEffect(() => {
  //   fetchKeranjangUser();
  // }, []);

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
    idKeranjangg: number,
    quantity: number,
    hargaMenu: number
  ) => {
    // Menghitung kuantitas baru setelah dikurangi
    const updatedQuantity = quantity - 1;

    // Jika kuantitas setelah dikurangi kurang dari 1, tampilkan modal dan hentikan proses
    if (updatedQuantity < 1) {
      const modal = document.getElementById("deleteMenu") as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
      return; // Hentikan eksekusi fungsi jika quantity kurang dari 1
    }

    // Jika quantity valid, lakukan update ke database
    const update = await kurangUpdate(idKeranjangg, quantity, hargaMenu);

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
    <div>
      {Object.values(getKeranjang).map((dataKeranjang: any, index: number) => (
        <div
          key={index}
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

      <dialog id="deleteMenu" className="modal">
        <div className="modal-box">
          <div className="flex justify-end">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
          <div className="my-8 text-center">
            <FontAwesomeIcon icon={faTrashAlt} className="size-20 text-red-500"></FontAwesomeIcon>
            <h4 className="text-gray-800 text-lg font-semibold mt-4">
              Apakah Kamu Yakin Ingin Menghapus Menu ini Dari Keranjang?
            </h4>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              type="button"
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

export default Cart;
