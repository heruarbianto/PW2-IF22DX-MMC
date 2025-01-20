import React, { useEffect, useState } from "react";
import { getDetailPesananbyId, getPesananbyId } from "../models/modelPemesanan";
import { DetailUser } from "../models/modelUser";

interface IdProps {
  idPesanan: number; // Tambahkan properti id
  UserId: number;
}
export default function receipt({ idPesanan, UserId }: IdProps) {
  const [getPesananByid, setPesananByid] = useState({});
  const [getAllDetailpesanan, setAllDetailpesanan] = useState({});
  const [getDetailUser, setDetailUser] = useState({});

  const fetchGetDetailPesanan = async () => {
    setPesananByid(await getPesananbyId(idPesanan));
    setAllDetailpesanan(await getDetailPesananbyId(idPesanan));
    setDetailUser(await DetailUser(UserId));
  };

  useEffect(() => {
    fetchGetDetailPesanan();
  }, []);

  // console.log(getAllDetailpesanan)
  // console.log(getPesananByid)

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-8">
              <img src="/Tukuyo-Logo.png" alt="Company Logo" className="h-12" />
              <h1 className="text-2xl font-semibold text-gray-700">Invoice</h1>
            </div>

            <div className="flex justify-between mb-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Tuku.yo</h2>
                <p className="text-sm text-gray-500">
                  jl. Za Pagar Alam, Bandar Lampung
                </p>
                <p className="text-sm text-gray-500">+62 896-1220-4603</p>
                <p className="text-sm text-gray-500">
                  mediamahasiswacreative@gmail.com
                </p>
              </div>
              {Object.values(getPesananByid)?.map(
                (pesanan: any, index: number) => (
                  <div key={index} className="text-right">
                    <p className="text-sm font-medium text-gray-700">
                      Invoice Number: {pesanan.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {pesanan.createdAt.toString()}
                    </p>
                  </div>
                )
              )}
            </div>
            {Object.values(getDetailUser)?.map((user: any, index: number) => (
              <div key={index} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Bill To:
                </h3>
                <p className="text-sm text-gray-600">{user.namaLengkap}</p>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">{user.noHp}</p>
                  <p className="text-sm text-gray-600 text-right">
                    {user.email}
                  </p>
                </div>
              </div>
            ))}

            <table className="w-full mb-8">
              <thead>
                <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                  <th className="py-2 text-left">Description</th>
                  <th className="py-2 text-right">Qty</th>
                  <th className="py-2 text-right">Rate</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(getAllDetailpesanan)?.map(
                  (item: any, index: number) => (
                    <tr key={index} className="text-sm text-gray-600">
                      <td className="py-4 text-left">
                        {item.keranjang.menu.nama}
                        <div className="text-xs text-gray-500">
                          {/* Catatan kecil */}
                        {item.note || " "}
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        {item.keranjang.quantity}
                      </td>
                      <td className="py-4 text-right">
                        {item.keranjang.menu.harga?.toLocaleString()}
                      </td>
                      <td className="py-4 text-right">
                        {item.keranjang.total?.toLocaleString()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            <div className="flex justify-end mb-8">
              {Object.values(getPesananByid)?.map(
                (pesanan: any, index: number) => (
                  <div key={index} className="text-right">
                    <p className="text-sm text-gray-600 mb-1">
                      Subtotal: {pesanan.totalProduk.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      PPN (11%): {(pesanan.totalProduk * 0.11).toLocaleString()}
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      Total: {pesanan.total.toLocaleString()}
                    </p>
                  </div>
                )
              )}
            </div>

            {/* <div className="border-t pt-8 mb-8">
            <p className="text-sm text-gray-600 mb-1">Payment Terms: Net 30</p>
            <p className="text-sm text-gray-600">Please make checks payable to TechCorp Solutions</p>
          </div> */}

            <div className="flex justify-center space-x-4">
              {/* <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"> */}
              {/* <FaPrint className="mr-2" /> */}
              {/* <FontAwesomeIcon  */}
              {/* icon={faPrint}  */}
              {/* className='mr-2' */}
              {/* onClick={SmallPrintInvoice} */}
              {/* ></FontAwesomeIcon> */}
              {/* Print */}
              {/* </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
