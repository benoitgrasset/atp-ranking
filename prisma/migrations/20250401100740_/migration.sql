/*
  Warnings:

  - You are about to drop the column `birthDate` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `index` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "birthDate",
DROP COLUMN "index";
