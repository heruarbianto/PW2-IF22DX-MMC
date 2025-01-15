"use client";
import React, { useEffect, useState } from "react";

export default function MainPage() {

  return (
    <div className="relative w-full h-screen">
        <img
        className="h-full w-full object-cover"
        src="/backgroundLandingPage1.jpg"
        alt=""
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-5xl font-bold mb-4">
          Welcome to <span className="underline decoration-white">Tuku.yo</span>
        </h1>

        <p className="text-white text-lg max-w-2xl mb-6">
          Explore the finest menu from Tuku.yo, filled with delightful dishes and refreshing beverages to quench your thirst. Discover our app to order your favorites and enjoy a seamless dining experience.
        </p>

        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white text-black font-semibold rounded-md shadow-md hover:bg-gray-100">
            How To Order
          </button>
          <button className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-md shadow-md hover:bg-white hover:text-black">
            Order Now
          </button>
        </div>
      </div>
      </div>
  );
}
