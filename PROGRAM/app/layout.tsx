"use client";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import MainPage from "./page";  // Mengimpor MainPage
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchQuery, setSearchQuery] = useState("");  // Menambahkan state searchQuery
  const pathname = usePathname();
  // Daftar halaman yang memerlukan navbar
  const pagesWithNavbar = ["/"];

  // Cek apakah halaman saat ini termasuk dalam daftar
  const showNavbar = pagesWithNavbar.includes(pathname);

  return (
    <html lang="en" data-theme="winter">
      <body
        className="font-sans max-h-[400px] overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {/* Area Header */}
        <header>
          {/* Navbar hanya tampil jika showNavbar adalah true */}
          {showNavbar && (

            <nav className="bg-white dark:bg-gray-800 antialiased">
              <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
                <div className="flex items-center justify-between">
                  {/* Logo  */}
                  <div className="flex items-center space-x-8">
                    <div className="shrink-0">
                      <a href="#" title="">
                        <img
                          className="block w-auto h-8"
                          src="/Tukuyo-Logo.png"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>

                  <form className="w-3/5 mx-auto">
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Foods, Drinks..."
                        value={searchQuery}  // Menggunakan state searchQuery
                        onChange={(e) => setSearchQuery(e.target.value)}  // Mengupdate state ketika ada perubahan
                        required
                      />
                      <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Search
                      </button>
                    </div>
                  </form>

                  {/* Cart dan User */}
                  <div className="flex items-center lg:space-x-2">
                    {/* Cart Button */}
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

                    {/* User */}
                    <button
                      id="userDropdownButton1"
                      type="button"
                      className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-blue-800 dark:text-blue-200"
                    >
                      <FontAwesomeIcon icon={faUser} />
                      <span className="hidden sm:flex m-2">Account</span>
                      <FontAwesomeIcon icon={faCaretDown} />
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          )}
        </header>

        {/* Area content */}
        {children}

        {/* Area footer */}
        <footer> 
        {showNavbar && (
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
        )}
        </footer>
      </body>
    </html>
  );
}
