-- CreateTable
CREATE TABLE `tb_menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(100) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `harga` DECIMAL(10, 2) NOT NULL,
    `kategori` ENUM('MAKANAN', 'MINUMAN') NOT NULL DEFAULT 'MAKANAN',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
