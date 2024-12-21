"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { LoginUser } from "../models/modelUser";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET as string;

export default function loginUser({ toggleForm }: { toggleForm: () => void }) {
  const [showAlertRegisterSukses, setShowAlertRegisterSukses] = useState(false);
  const [getUsername, setUsername] = useState("");
  const [getPassword, setPassword] = useState("");
  const [showAlertError, setShowAlertError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null); // Menyimpan role pengguna
  const router = useRouter();

  const fetchUserLogin = async () => {
    setLoading(true);
    try {
      const respon = await LoginUser(getUsername, getPassword);

      if (respon === "Username/Password Salah") {
        setShowAlertError(true);
        setTimeout(() => setShowAlertError(false), 3000);
        setLoading(false);
        return;
      }
      const isProduction = process.env.NODE_ENV === "production";

      // Set cookie token
      document.cookie = `authToken=${respon}; path=/; max-age=1200; secure; SameSite=Lax`;

      // Verifikasi token
      const secret = new TextEncoder().encode("INI_ADALAH_JWT_SECRET_TUKUYO");
      const { payload } = await jwtVerify(respon, secret);

      const role = (payload as { role: string }).role;
      // console.log("Token verified. User role:", role); // Debugging log
      setUserRole(role);
    } catch (error) {
      console.error("Error during login or token verification:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchUserLogin();
  };

  useEffect(() => {
    // console.log("User role updated:", userRole); // Debugging log
    if (userRole === "ADMIN") {
      router.push("../dashboardadmin");
    } else if (userRole === "PELANGGAN") {
      router.push("../dashboard");
    }

    if (localStorage.getItem("registerSuccess") === "true") {
      setShowAlertRegisterSukses(true);
      localStorage.removeItem("registerSuccess");
      setTimeout(() => setShowAlertRegisterSukses(false), 3000);
    }
  }, [userRole, router]);

  return (
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
            {showAlertRegisterSukses && (
              <div
                className="flex items-center p-4 mb-4 rounded-xl text-sm border border-emerald-400 bg-emerald-50 text-emerald-500"
                role="alert"
              >
                <FontAwesomeIcon icon={faCircleCheck} className="mx-1" />
                <span className="font-semibold mr-1">Register Berhasil</span>
              </div>
            )}
            {showAlertError && (
              <div
                className="flex items-center p-4 mb-4 rounded-xl text-sm border border-red-400 bg-red-50 text-red-500"
                role="alert"
              >
                <FontAwesomeIcon icon={faCircleExclamation} />
                <span className="font-semibold mr-1">
                  Username/Password Salah
                </span>
              </div>
            )}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="Username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="Username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="udin123"
                  required
                  value={getUsername}
                  onChange={(e) => setUsername(e.target.value)}
                />
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
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={getPassword}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loading ? "Loading..." : "Sign in"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  onClick={toggleForm}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
