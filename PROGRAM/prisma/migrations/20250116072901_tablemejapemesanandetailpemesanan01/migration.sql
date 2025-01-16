-- CreateTable
CREATE TABLE `tb_meja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaMeja` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `tb_meja_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_pemesanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `idMeja` INTEGER NOT NULL,
    `metode` ENUM('COD', 'ePayment') NOT NULL DEFAULT 'COD',
    `totalProduk` INTEGER NOT NULL,
    `pajak` VARCHAR(10) NOT NULL,
    `total` INTEGER NOT NULL,
    `status` ENUM('MENUNGGUPEMBAYARAN', 'DIPROSES', 'SELESAI', 'DIBATALKAN') NOT NULL DEFAULT 'MENUNGGUPEMBAYARAN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `tb_pemesanan_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_pemesanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idPemesanan` INTEGER NOT NULL,
    `idKeranjang` INTEGER NOT NULL,
    `note` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_pemesanan` ADD CONSTRAINT `tb_pemesanan_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `tb_user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_pemesanan` ADD CONSTRAINT `tb_pemesanan_idMeja_fkey` FOREIGN KEY (`idMeja`) REFERENCES `tb_meja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_pemesanan` ADD CONSTRAINT `detail_pemesanan_idPemesanan_fkey` FOREIGN KEY (`idPemesanan`) REFERENCES `tb_pemesanan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_pemesanan` ADD CONSTRAINT `detail_pemesanan_idKeranjang_fkey` FOREIGN KEY (`idKeranjang`) REFERENCES `tb_keranjang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
