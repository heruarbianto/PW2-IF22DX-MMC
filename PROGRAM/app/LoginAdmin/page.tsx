"use client"
import React, { useEffect, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { LoginUser } from '../models/modelUser';
export default function LoginAdmin() {
  const [getUsername, setUsername] = useState('');
  const [getPassword, setPassword] = useState('');
  const [showAlertError, setShowAlertError] = useState(false);
  // const [ShowAlertErrorLogin, setShowAlertErrorLogin] = useState(false);

  const [isLoginAdmin, setIsLoginAdmin] = useState(false); // New state for successful Login
  const [errors, setErrors] = useState("");
    // Fungsi untuk respon Login User
    const fetchUserLogin = async () => {
      // Panggil fungsi untuk menyimpan Data Pelanggan
      const respon = await LoginUser(
        getUsername,
        getPassword
      );
  
      if (respon === "Username/Password Salah") {
        setErrors(respon);
        setShowAlertError(true);
        setTimeout(() => {
          setShowAlertError(false);
        }, 3000);
      } else {
        localStorage.setItem("LoginUserSuccess", "true");
        document.cookie = `authToken=${respon}; path=/; max-age=900; secure;`;
        // console.log(respon)
        setIsLoginAdmin(true)
      }
    };
    const handleSubmit = async (e: React.FormEvent) => {
      // Mencegah reload
      e.preventDefault();
      await fetchUserLogin();
      if(isLoginAdmin){
        window.location.assign("../DashboardAdmin");
      }
    };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-auto h-8 mr-2" src="../Tukuyo-Logo.png" alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {showAlertError && (
                <div className="flex items-center p-4 mb-4 rounded-xl text-sm border border-red-400 bg-red-50 text-red-500" role="alert">
                    <FontAwesomeIcon icon={faCircleExclamation} className='mr-2.5'></FontAwesomeIcon>
                    <span className="font-semibold mr-1">{errors}</span>
                </div>
            )} 
                    {/* 
             {ShowAlertErrorLogin && (
                <div className="flex items-center p-4 mb-4 rounded-xl text-sm border border-red-400 bg-red-50 text-red-500" role="alert">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0043 13.3333V9.16663M9.99984 6.66663H10.0073M9.99984 18.3333C5.39746 18.3333 1.6665 14.6023 1.6665 9.99996C1.6665 5.39759 5.39746 1.66663 9.99984 1.66663C14.6022 1.66663 18.3332 5.39759 18.3332 9.99996C18.3332 14.6023 14.6022 18.3333 9.99984 18.3333Z" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span className="font-semibold mr-1">TOKEN KOSOMG NJING</span>
                </div>
            )}
             */}
            {/* {msg && <p className="text-sm text-red-500">{msg}</p>} Pesan error atau sukses */}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input type="text" name="Username" id="Username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="udin123" required value={getUsername} onChange={(e) => setUsername(e.target.value)}/>
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={getPassword} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
