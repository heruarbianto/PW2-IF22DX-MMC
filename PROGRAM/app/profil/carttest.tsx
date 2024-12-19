"use client";
import { useEffect, useState } from "react";
import {
  KeranjangUser,
  kurangUpdate,
  tambahUpdate,
} from "../models/modelKeranjang";
import keranjang from "../modal/keranjang";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const [getIsiCart, setIsiCart] = useState({});
  const [getKeranjang, setKeranjang] = useState(getIsiCart);

  const fetchKeranjangUser = async () => {
    const data = await KeranjangUser();
    console.log("Data Keranjang:", data); // Debugging
    setIsiCart(data);
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
    const idKeranjang = idKeranjangg - 1;
    setKeranjang((prevKeranjang: any) => {
      const updatedKeranjang = { ...prevKeranjang };
      const updatedQuantity = quantity + 1;

      if (updatedKeranjang[idKeranjang]) {
        updatedKeranjang[idKeranjang] = {
          ...updatedKeranjang[idKeranjang],
          quantity: updatedQuantity,
          total: updatedKeranjang[idKeranjang].menu.harga * updatedQuantity,
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
    await kurangUpdate(idKeranjangg, quantity, hargaMenu);
    const idKeranjang = idKeranjangg - 1;
    setKeranjang((prevKeranjang: any) => {
      const updatedKeranjang = { ...prevKeranjang };
      const updatedQuantity = quantity - 1;

      if (updatedKeranjang[idKeranjang]) {
        updatedKeranjang[idKeranjang] = {
          ...updatedKeranjang[idKeranjang],
          quantity: updatedQuantity,
          total: updatedKeranjang[idKeranjang].menu.harga * updatedQuantity,
        };
      }

      return updatedKeranjang;
    });
  };

  return (
    <div>
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
  );
}

export default Cart;
