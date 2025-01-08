"use client";

import React from "react";

export default function Page() {
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Wrapper untuk membatasi lebar layout */}
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <img
                src=""
                alt=""
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
                <p className="text-sm text-gray-500">johndoe@example.com</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded">
              Edit Profile
            </button>
          </div>

          {/* Statistics */}
          <div className="col-span-2 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800">Statistics</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-blue-100 text-blue-700 p-4 rounded text-center">
                <p className="text-2xl font-bold">120</p>
                <p className="text-sm">Orders</p>
              </div>
              <div className="bg-green-100 text-green-700 p-4 rounded text-center">
                <p className="text-2xl font-bold">50</p>
                <p className="text-sm">Products</p>
              </div>
              <div className="bg-yellow-100 text-yellow-700 p-4 rounded text-center">
                <p className="text-2xl font-bold">30</p>
                <p className="text-sm">Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <section className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h3>
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 font-semibold text-gray-600">Order ID</th>
                  <th className="p-4 font-semibold text-gray-600">Date</th>
                  <th className="p-4 font-semibold text-gray-600">Status</th>
                  <th className="p-4 font-semibold text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">#12345</td>
                  <td className="p-4">2025-01-07</td>
                  <td className="p-4 text-green-600">Completed</td>
                  <td className="p-4">Rp 1,500,000</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">#12346</td>
                  <td className="p-4">2025-01-06</td>
                  <td className="p-4 text-yellow-600">Pending</td>
                  <td className="p-4">Rp 750,000</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-4">#12347</td>
                  <td className="p-4">2025-01-05</td>
                  <td className="p-4 text-red-600">Cancelled</td>
                  <td className="p-4">Rp 0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>      
        </div>
    </div>
  );
}
