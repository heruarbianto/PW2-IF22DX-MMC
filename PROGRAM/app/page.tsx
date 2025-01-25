"use client";
import Link from "next/link";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function MainPage() {
  const steps = [
    {
      text: "Silahkan klik Order Now dan anda akan masuk ke halaman login, Jika belum punya akun silahkan daftar terlebih dahulu",
      image: "/Step1.png", // Path ke gambar screenshot langkah 1
    },
    {
      text: "Setelah itu anda dapat memilih menu yang ingin anda beli dengan memasukkan nya ke keranjang terlebih dahulu",
      image: "/Step2.png", // Path ke gambar screenshot langkah 2
    },
    {
      text: "Anda bisa melihat menu yang sudah ditambahkan di keranjang dengan mengklik bagian Mychart",
      image: "/Step3.jpeg", // Path ke gambar screenshot langkah 3
    },
    {
      text: "Lalu silahkan centang menu yang akan dicheckout dan klik tombol checkout",
      image: "/Step4.jpg", // Path ke gambar screenshot langkah 4
    },
    {
      text: "Lalu anda bisa memilih pick up atau pesan meja di tempat, kemudian pilih metode pembayaran dan jika sudah klik pesan sekarang",
      image: "/Step5.png", // Path ke gambar screenshot langkah 4
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Bagian 1: Landing Page Image dengan Overlay */}
      <div className="relative flex-grow flex items-center justify-center h-screen">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/backgroundLandingPage1.jpg"
          alt="Background"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-5xl font-bold mb-4">
            Welcome to <span className="underline decoration-white">Tuku.yo</span>
          </h1>
          <p className="text-white text-lg max-w-2xl mb-6">
            Explore the finest menu from Tuku.yo, filled with delightful dishes
            and refreshing beverages to quench your thirst. Discover our app to
            order your favorites and enjoy a seamless dining experience.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white text-black font-semibold rounded-md shadow-md hover:bg-gray-100">
              How To Order
            </button>
            <Link href="/login">
              <button className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-md shadow-md hover:bg-white hover:text-black">
                Order Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bagian 2: How To Order Section */}
      <div className="bg-white py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Cara Pesan di Tuku.yo
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <Step key={index} index={index} text={step.text} image={step.image} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Step({ index, text, image }: { index: number; text: string; image: string }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 }, // Animasi muncul dari bawah
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-4"
    >
      <div className="flex items-start space-x-4">
        <span className="text-blue-500 font-bold text-xl">{index + 1}.</span>
        <p className="text-gray-700 text-lg">{text}</p>
      </div>
      {/* Gambar Screenshot dengan Animasi */}
      <motion.img
        src={image}
        alt={`Step ${index + 1}`}
        className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      />
    </motion.div>
  );
}