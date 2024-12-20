import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RegisPelanggan } from "../models/modelUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function registerUser({
  toggleForm,
  onRegisterSuccess,
}: {
  toggleForm: () => void; // Callback untuk toggle form
  onRegisterSuccess: () => void; // Callback ketika registrasi berhasil
}) {
  const [getNama, setNamaLengkap] = useState("");
  const [getUsername, setUsername] = useState("");
  const [getNoTelp, setNoTelp] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getAlamat, setAlamat] = useState("");
  const [showAlertError, setShowAlertError] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    noTelp: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // New state for successful registration

  // Handle Input jika kesalahan erorr dilakukan perubahan
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    setter: (value: string) => void
  ) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" })); // Hapus kesalahan spesifik
  };

  // Fungsi untuk respon Register Pelanggan
  const fetchsetUserRegister = async () => {
    setLoading(true);
    // Panggil fungsi untuk menyimpan Data Pelanggan
    if (
      !getNama ||
      !getUsername ||
      !getNoTelp ||
      !getEmail ||
      !getPassword ||
      !getAlamat
    ) {
      setShowAlertError(true);
      setTimeout(() => setShowAlertError(false), 3000);
    } else {
      const respon = await RegisPelanggan(
        getNama,
        getUsername,
        getNoTelp,
        getEmail,
        getPassword,
        getAlamat
      );

      // reset semua error sebelum menset eror baru
      setErrors({
        username: "",
        noTelp: "",
        email: "",
      });
      if (respon === "Username Telah Digunakan") {
        setErrors((prevErrors) => ({ ...prevErrors, username: respon }));
      } else if (respon === "Email Telah Digunakan") {
        setErrors((prevErrors) => ({ ...prevErrors, email: respon }));
      } else if (respon === "No. Telp Telah Digunakan") {
        setErrors((prevErrors) => ({ ...prevErrors, noTelp: respon }));
      } else {
        localStorage.setItem("registerSuccess", "true");
        setIsRegistered(true);
      }
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // Mencegah reload
    e.preventDefault();
    // Panggil fetchsetMenu untuk menyimpan data
    await fetchsetUserRegister();

    // Jika resgister Berhasil Arahkan ke Login
    // if (isRegistered==true) {
    //   onRegisterSuccess();
    //   setIsRegistered(false)
    // }
  };
  // handle input telp hanya menerima angka
  const handleInputTelp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, ""); // Hanya angka tanpa spasi
    setNoTelp(numericValue);
    setErrors((prevErrors) => ({ ...prevErrors, noTelp: "" })); // Bersihkan kesalahan noTelp
  };

  // useEffect untuk menangani redireksi setelah berhasil registrasi
  useEffect(() => {
    if (isRegistered && !errors.username && !errors.noTelp && !errors.email) {
      onRegisterSuccess();
    }
  }, [isRegistered, errors, onRegisterSuccess]);

  return (
      <div>
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-auto h-8 mr-2"
            src="../Tukuyo-Logo.png"
            alt="logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register
            </h1>
          {showAlertError && (
              <div
                className="flex items-center p-4 mb-4 rounded-xl text-sm border border-red-400 bg-red-50 text-red-500"
                role="alert"
              >
                <FontAwesomeIcon icon={faCircleExclamation}/>
                &nbsp;
                <span className="font-semibold mr-1">
                Semua Form Wajib Diisi
                </span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="nama_lengkap"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="nama_lengkap"
                  id="nama_lengkap"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Udin Segalanya"
                  required
                  value={getNama}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className={`bg-gray-50 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  placeholder="udin123"
                  maxLength={20}
                  required
                  value={getUsername}
                  onChange={(e) =>
                    handleInputChange(e, "username", setUsername)
                  }
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="Telp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  No. Telp
                </label>
                <input
                  type="text"
                  name="noTelp"
                  id="Telp"
                  className={`bg-gray-50 border ${
                    errors.noTelp ? "border-red-500" : "border-gray-300"
                  } text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  placeholder="089xxxxxxxxx"
                  maxLength={20}
                  required
                  value={getNoTelp}
                  onChange={handleInputTelp}
                />
                {errors.noTelp && (
                  <p className="text-red-500 text-xs mt-1">{errors.noTelp}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  placeholder="Udin@email.com"
                  required
                  value={getEmail}
                  onChange={(e) => handleInputChange(e, "email", setEmail)}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={getPassword}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="alamat"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Alamat
                </label>
                <input
                  type="text"
                  name="alamat"
                  id="alamat"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Jl. Kenanga Blok.10"
                  required
                  value={getAlamat}
                  onChange={(e) => setAlamat(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  // Tampilkan elemen loading
                  <div className="col-span-full flex justify-center items-center">
                    <div className="flex space-x-4">
                      <span className="loading loading-dots loading-sm text-white"></span>
                    </div>
                  </div>
                ) : (
                  "Register"
                )}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  onClick={toggleForm}
                  href="#"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

    </section>
      </div>
  );
}
