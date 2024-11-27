"use client"
import React, { useState } from 'react'
import LoginUser from './loginUser'
import RegisterUser from './registerUser'
export default function Login() {
    // State untuk mengontrol tampilan komponen Login atau Register
    const [isLogin, setIsLogin] = useState(true)

    // Fungsi untuk beralih antara Login dan Register
    const toggleForm = () => {setIsLogin(!isLogin)}

  return (
    <div>
      {/* Tampilkan komponen Login jika isLogin true, dan Register jika false */}
      {isLogin ? (
        <LoginUser toggleForm={toggleForm} />
      ) : (
        <RegisterUser toggleForm={toggleForm} />
      )}
    </div>
  )
}
