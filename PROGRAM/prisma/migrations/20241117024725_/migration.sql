/*
  Warnings:

  - Added the required column `image` to the `tb_menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tb_menu` ADD COLUMN `image` VARCHAR(100) NOT NULL;
