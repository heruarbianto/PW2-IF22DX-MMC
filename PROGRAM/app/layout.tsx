"use client";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pagesWithNavbar = ["/"];
  const showNavbar = pagesWithNavbar.includes(pathname);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Jika scroll > 50px, ubah navbar menjadi solid
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en" data-theme="winter" className="h-full">
      <body
        className="h-full flex flex-col font-sans overflow-y-auto
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <header>
          {showNavbar && (
            <nav
              className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
                isScrolled ? "bg-white dark:bg-gray-800" : "bg-transparent"
              }`}
            >
              <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
                <div className="flex items-center justify-between">
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
                  <div className="flex items-center lg:space-x-2">
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

        {/* Konten Utama */}
        <div className="flex-grow">{children}</div>

        <footer>
          {showNavbar && (
            <div className="bg-gray-800 text-white py-8">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 text-blue-800">
                      Tentang Kami
                    </h3>
                    <p className="text-gray-400">
                      Tuku Yo adalah platform e-menu inovatif yang dirancang untuk memberikan
                      pengalaman terbaik dalam memesan makanan dan minuman secara digital.
                      Kami berkomitmen untuk menghadirkan kenyamanan, kecepatan, dan efisiensi
                      dalam setiap kunjungan Anda ke restoran atau kafe yang bekerja sama dengan kami.
                    </p>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 text-blue-800">Kontak</h3>
                    <ul className="text-gray-400 space-y-2">
                      <li>
                        Email:{" "}
                        <a href="mailto:info@website.com" className="hover:text-white">
                          mediamahasiswacreative@gmail.com
                        </a>
                      </li>
                      <li>
                        Telepon:{" "}
                        <a href="tel:+628123456789" className="hover:text-white">
                          +62 822 3344 555
                        </a>
                      </li>
                      <li>
                        Alamat: Jl. Zainal Abidin Pagaralam No.9-11, Bandar Lampung, Lampung
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-700 mt-8"></div>
                <div className="text-center text-gray-400 text-sm mt-4">© 2024 Tuku Yo</div>
              </div>
            </div>
          )}
        </footer>
      </body>
    </html>
  );
}
