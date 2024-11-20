/*
  Warnings:

  - You are about to alter the column `harga` on the `tb_menu` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Int`.

*/
-- AlterTable
ALTER TABLE `tb_menu` MODIFY `harga` INTEGER NOT NULL;
