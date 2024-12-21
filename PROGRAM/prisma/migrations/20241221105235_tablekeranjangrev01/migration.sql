-- CreateTable
CREATE TABLE `tb_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaLengkap` VARCHAR(100) NOT NULL,
    `username` CHAR(22) NOT NULL,
    `noHp` VARCHAR(20) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `alamat` TEXT NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `role` ENUM('ADMIN', 'KASIR', 'PELANGGAN') NOT NULL DEFAULT 'PELANGGAN',

    UNIQUE INDEX `tb_user_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_keranjang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `idMenu` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    UNIQUE INDEX `tb_keranjang_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_keranjang` ADD CONSTRAINT `tb_keranjang_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `tb_user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_keranjang` ADD CONSTRAINT `tb_keranjang_idMenu_fkey` FOREIGN KEY (`idMenu`) REFERENCES `tb_menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
