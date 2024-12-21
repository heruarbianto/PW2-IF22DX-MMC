-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 21, 2024 at 12:07 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `PW2_IF22DX_MMC`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_keranjang`
--

CREATE TABLE `tb_keranjang` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idMenu` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_menu`
--

CREATE TABLE `tb_menu` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `deskripsi` text NOT NULL,
  `harga` int(11) NOT NULL,
  `kategori` enum('MAKANAN','MINUMAN') NOT NULL DEFAULT 'MAKANAN',
  `gambar_menu` text NOT NULL,
  `ketersediaan` enum('READY','SOLDOUT') NOT NULL DEFAULT 'READY'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_menu`
--

INSERT INTO `tb_menu` (`id`, `nama`, `deskripsi`, `harga`, `kategori`, `gambar_menu`, `ketersediaan`) VALUES
(1, 'KEBAB ARAB', 'Kebab adalah hidangan khas Timur Tengah yang terdiri dari roti tortilla lembut yang membungkus isian lezat berupa daging panggang yang juicy, seperti ayam, sapi, atau kambing, dipadukan dengan sayuran segar seperti selada, tomat, dan timun. Disempurnakan dengan saus mayones, keju, atau saus pedas yang menggugah selera, kebab menawarkan perpaduan rasa gurih, segar, dan sedikit pedas dalam setiap gigitannya. Cocok dinikmati sebagai camilan praktis atau hidangan mengenyangkan kapan saja!', 25000, 'MAKANAN', '/imageMenu/KEBAB-ARAB-1734778929877.jpg', 'SOLDOUT'),
(2, 'Pizza Gulung', 'Nikmati sensasi berbeda dari Pizza Gulung! Roti pizza yang kenyal digulung dengan isian keju leleh, saus tomat, dan topping pilihan Anda, seperti pepperoni, jamur, atau sayuran segar. Setiap potongan pizza gulung ini memberikan perpaduan rasa yang menggugah selera dan kepraktisan untuk dinikmati kapan saja. Cocok sebagai camilan atau makanan utama yang unik!', 120000, 'MAKANAN', '/imageMenu/Pizza-Gulung-1734778978521.jpg', 'READY'),
(3, 'Ikan Salmon', 'Ikan Salmon Panggang kami disiapkan dengan penuh perhatian, menggunakan ikan salmon segar yang dipanggang dengan sempurna. Daging ikan yang lembut dan juicy ini dipadu dengan bumbu rempah yang ringan namun menggugah selera. Disajikan dengan pilihan sayuran segar dan nasi hangat, hidangan ini menjadi pilihan yang sehat dan lezat untuk santapan yang bergizi.', 135000, 'MAKANAN', '/imageMenu/Ikan-Salmon-1734778890638.jpg', 'READY'),
(4, 'Sop Buah', 'Segarkan diri Anda dengan Sop Buah, sajian manis dan segar yang terdiri dari potongan buah-buahan segar seperti melon, semangka, pepaya, dan nanas, disiram dengan sirup manis dan es serut. Hidangan penutup yang menyegarkan dan menyehatkan, cocok untuk menambah kesegaran setelah menikmati hidangan utama.', 15000, 'MINUMAN', '/imageMenu/Sop-Buah-1734778991604.jpg', 'READY'),
(5, 'Es Dawet', 'Es Dawet adalah minuman tradisional yang menghadirkan cita rasa khas Indonesia. Terbuat dari cendol hijau yang kenyal, disiram dengan air daun pandan yang manis dan segar, serta siraman santan yang gurih. Dingin dan menyegarkan, Es Dawet cocok dinikmati di segala cuaca dan menjadi pilihan tepat untuk menambah semangat sepanjang hari.', 5000, 'MINUMAN', '/imageMenu/Es-Dawet-1734779003124.jpg', 'READY'),
(6, 'Es Boba', 'Nikmati segarnya Es Boba, minuman kekinian yang menyegarkan dengan campuran es serut, susu manis, dan bola tapioka kenyal yang siap memanjakan lidah Anda. Tersedia dalam berbagai pilihan rasa, mulai dari teh taro, cokelat, hingga matcha, Es Boba ini adalah pilihan sempurna untuk melepas dahaga sambil menikmati tekstur kenyal yang menyenangkan.', 10000, 'MINUMAN', '/imageMenu/Es-Boba-1734779022240.jpg', 'READY'),
(7, 'Roti isi Daging', 'Nikmati perpaduan sempurna antara roti empuk yang dipanggang hingga keemasan dengan daging pilihan yang lezat dan bumbu rahasia yang menggugah selera. Daging yang digunakan bisa berupa daging sapi, ayam, atau kambing, yang dimasak dengan rempah pilihan untuk menciptakan cita rasa yang kaya dan berani. Setiap gigitan menghadirkan rasa gurih dan kenikmatan, dipadukan dengan sayuran segar dan saus pilihan yang semakin memperkaya rasa. Roti Isi Daging Spesial ini cocok untuk makan siang yang memuaskan atau sebagai camilan lezat di setiap waktu. Tambahkan pilihan keju leleh atau acar sebagai pelengkap untuk pengalaman makan yang lebih istimewa.', 100000, 'MAKANAN', '/imageMenu/Roti-isi-Daging-1734779033298.jpg', 'READY'),
(8, 'Nasi Ayam Bakar', 'Nasi Ayam Bakar adalah sajian khas yang menggabungkan nasi putih pulen dengan ayam yang dipanggang hingga matang sempurna, menghasilkan rasa yang smoky dan gurih. Ayamnya dilumuri bumbu rempah khas yang meresap hingga ke dalam, menciptakan perpaduan cita rasa manis, gurih, dan sedikit pedas. Disajikan bersama sambal yang menggigit, lalapan segar, serta pelengkap seperti tahu atau tempe, hidangan ini sempurna untuk memuaskan selera makan Anda.', 25000, 'MAKANAN', '/imageMenu/Nasi-Ayam-Bakar-1734779067415.jpg', 'SOLDOUT'),
(9, 'Seblak Jebret', 'Seblak Jebrett Paket Komplit adalah sajian pedas khas Bandung yang menggugah selera, berisi kombinasi kerupuk kenyal, mie, bakso, sosis, ceker ayam, dan telur orak-arik yang dimasak dengan bumbu rempah khas beraroma kuat. Dilengkapi dengan kuah gurih pedas yang bisa disesuaikan tingkat kepedasannya, menu ini cocok untuk Anda yang menyukai sensasi rasa pedas menggigit dengan berbagai tekstur dalam satu piring. Nikmati kelezatan dan kepedasan yang bikin nagih!', 18000, 'MAKANAN', '/imageMenu/Seblak-Jebret-1734779078506.jpg', 'SOLDOUT'),
(10, 'Jus Alpukat', 'Jus Alpukat adalah minuman segar yang kaya akan rasa creamy alami dari alpukat matang berkualitas. Dibuat dengan campuran daging buah alpukat yang lembut, susu kental manis, dan sedikit es untuk sensasi dingin yang menyegarkan. Disajikan dengan topping cokelat atau tambahan gula aren sesuai selera, jus ini tidak hanya nikmat tetapi juga kaya nutrisi, menjadikannya pilihan sempurna untuk melepas dahaga sekaligus menjaga kesehatan.', 15000, 'MINUMAN', '/imageMenu/Jus-Alpukat-1734779091021.jpg', 'SOLDOUT'),
(11, 'Extra Nasi', 'Extra Nasi adalah porsi tambahan nasi putih yang pulen dan hangat, cocok untuk melengkapi hidangan utama Anda. Pas untuk Anda yang membutuhkan tambahan karbohidrat agar lebih kenyang dan puas menikmati santapan favorit', 5000, 'MAKANAN', '/imageMenu/Extra-Nasi-1734779135151.jpg', 'READY'),
(13, 'Mie Jebew', 'Mie Jebew adalah hidangan mie pedas khas dengan rasa yang nendang dan menggugah selera. Dibuat dari mie kenyal yang dimasak dengan bumbu spesial bercita rasa gurih pedas, mie ini sering dilengkapi dengan topping seperti bakso, sosis, telur, atau ceker ayam. Cocok untuk pecinta makanan pedas yang mencari sensasi rasa kuat dalam setiap suapan. Berani coba?', 10000, 'MAKANAN', '/imageMenu/Mie-Jebew-1734779220869.webp', 'SOLDOUT');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL,
  `namaLengkap` varchar(100) NOT NULL,
  `username` char(22) NOT NULL,
  `noHp` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `alamat` text NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` enum('ADMIN','KASIR','PELANGGAN') NOT NULL DEFAULT 'PELANGGAN'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id`, `namaLengkap`, `username`, `noHp`, `email`, `alamat`, `password`, `role`) VALUES
(1, 'HERU ARBIANNTO', '22312004', '089612204603', 'heru_arbianto@teknokrat.ac.id', 'jl. merpati pinang jaya', 'Heru40865', 'ADMIN'),
(2, 'Julius John C', '22312022', '08888888888', 'julius@teknokrat.ac.id', 'natar', '123', 'PELANGGAN'),
(3, 'HERU ARBIANNTO', '22312004', '089612204603', 'heru_arbianto@teknokrat.ac.id', 'jl. merpati pinang jaya', 'Heru40865', 'ADMIN'),
(4, 'Julius John C', '22312022', '08888888888', 'julius@teknokrat.ac.id', 'natar', '123', 'PELANGGAN');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('206030e3-a61a-4d9d-9c76-483cc209a73b', 'fad8b4076e4aeb45e5191799383a66f5522597e8cf0e1a87d6f8d48c93153574', '2024-12-21 10:52:22.866', '20241120123539_', NULL, NULL, '2024-12-21 10:52:22.844', 1),
('30c41a63-a1a6-4ea5-822a-95feb362157a', '8d08a7438127af1e9747667adcbb166bfbcdd8f00b24619fd5566d26e7f40abe', '2024-12-21 10:52:35.932', '20241221105235_tablekeranjangrev01', NULL, NULL, '2024-12-21 10:52:35.877', 1),
('4f516e9f-dc05-48d7-bed2-b69da5e1c5d6', '25397fce931c1dbdab484b1d24f051f0af8b33531ca1abee3ab7cd8f64467331', '2024-12-21 10:52:22.904', '20241126135512_tablemenurev04', NULL, NULL, '2024-12-21 10:52:22.893', 1),
('6d91bced-2c66-40a8-9020-49dc1cadeb3a', '6749034398bc2212166bfccf9feebeba72857672708addb2894b717c066610cc', '2024-12-21 10:52:22.892', '20241124044200_migarasimenu01', NULL, NULL, '2024-12-21 10:52:22.867', 1),
('db767eb4-8b0a-4b05-b14d-6dc3d36109df', '502b06cd5c3a7ef4680539e2e742a8722b828bbe18377410ae1c6090349787cb', '2024-12-21 10:52:22.842', '20241117031322_tablemenurev01', NULL, NULL, '2024-12-21 10:52:22.833', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_keranjang`
--
ALTER TABLE `tb_keranjang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tb_keranjang_id_key` (`id`),
  ADD KEY `tb_keranjang_idUser_fkey` (`idUser`),
  ADD KEY `tb_keranjang_idMenu_fkey` (`idMenu`);

--
-- Indexes for table `tb_menu`
--
ALTER TABLE `tb_menu`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tb_menu_id_key` (`id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tb_user_id_key` (`id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_keranjang`
--
ALTER TABLE `tb_keranjang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_menu`
--
ALTER TABLE `tb_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_keranjang`
--
ALTER TABLE `tb_keranjang`
  ADD CONSTRAINT `tb_keranjang_idMenu_fkey` FOREIGN KEY (`idMenu`) REFERENCES `tb_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_keranjang_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `tb_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;