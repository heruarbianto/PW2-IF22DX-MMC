"use client";
import "../globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { setSearchQuery } from "../models/modelSearch";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // Daftar halaman yang memerlukan navbar
const pagesWithFooter = ["/dashboard"];

  // Cek apakah halaman saat ini termasuk dalam daftar
const showFooter = pagesWithFooter.includes(pathname);

const [inputValue, setInputValue] = useState("");

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setInputValue(value);
  setSearchQuery(value); // Perbarui query pencarian di model
};
  return (
        <div>
        {/* Area Header */}
        <header>
            <nav className="bg-white dark:bg-gray-800 antialiased">
              <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
                <div className="flex items-center justify-between">
                  {/* Logo  */}
                  <div className="flex items-center space-x-8">
                    <div className="shrink-0">
                      <Link href="/dashboard">
                        <img
                          className="block w-auto h-8"
                          src="/Tukuyo-Logo.png"
                          alt="Logo Tukuyo"
                        />
                      </Link>
                    </div>
                  </div>

                  
                  {/* Cart dan User */}
                  <div className="flex items-center lg:space-x-2">
                    {/* Cart Button */}
                    <Link href={'/dashboard/keranjang'}>
                    <button
                      id="myCartDropdownButton1"
                      type="button"
                      className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-blue-800 dark:text-blue-200"
                    >
                      <span className="sr-only">Cart</span>

                      <FontAwesomeIcon icon={faCartShopping} />

                      <span className="hidden sm:flex m-2">My Cart</span>
                      <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                      </Link>

                    {/* User */}
                    <Link href={'/dashboard/profile'}>
                    <button
                      id="userDropdownButton1"
                      type="button"
                      className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-blue-800 dark:text-blue-200"
                    >
                      <FontAwesomeIcon icon={faUser} />
                      <span className="hidden sm:flex m-2">Account</span>
                      <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
        </header>

        {/* Area content */}
        {children}

        {/* Area footer */}
        {showFooter && (
        <footer> 
          <div className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            {/* Flex Container untuk Tentang Kami dan Kontak */}
            <div className="flex flex-col md:flex-row justify-between gap-8">
              {/* Tentang Kami */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">Tentang Kami</h3>
                <p className="text-gray-400">
                  Tuku Yo adalah platform e-menu inovatif yang dirancang untuk memberikan 
                  pengalaman terbaik dalam memesan makanan dan minuman secara digital. 
                  Kami berkomitmen untuk menghadirkan kenyamanan, kecepatan, dan efisiensi 
                  dalam setiap kunjungan Anda ke restoran atau kafe yang bekerja sama dengan kami.
                </p>
              </div>
              {/* Kontak */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">Kontak</h3>
                <ul className="text-gray-400 space-y-2">
                  <li>Email: <a href="mailto:info@website.com" className="hover:text-white">mediamahasiswacreative@gmail.com</a></li>
                  <li>Telepon: <a href="tel:+628123456789" className="hover:text-white">+62 822 3344 555</a></li>
                  <li>Alamat: Jl. Zainal Abidin Pagaralam No.9-11, Bandar Lampung, Lampung</li>
                </ul>
              </div>
            </div>
            {/* Garis Pemisah */}
            <div className="border-t border-gray-700 mt-8"></div>
            {/* Copyright */}
            <div className="text-center text-gray-400 text-sm mt-4">
              © 2024 Tuku Yo
            </div>
          </div>
          </div>
        </footer>
        )}
      </div>
  );
}
