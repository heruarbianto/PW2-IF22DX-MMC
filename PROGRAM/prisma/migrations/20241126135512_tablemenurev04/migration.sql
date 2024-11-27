/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `tb_menu` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `tb_menu` ADD COLUMN `ketersediaan` ENUM('READY', 'SOLDOUT') NOT NULL DEFAULT 'READY';

-- CreateIndex
CREATE UNIQUE INDEX `tb_menu_id_key` ON `tb_menu`(`id`);
