/*
  Warnings:

  - Added the required column `index` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progression` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `racePoints` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raceRanking` to the `player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "player" ADD COLUMN     "index" INTEGER NOT NULL,
ADD COLUMN     "progression" INTEGER NOT NULL,
ADD COLUMN     "racePoints" INTEGER NOT NULL,
ADD COLUMN     "raceRanking" INTEGER NOT NULL,
ALTER COLUMN "rankedAt" SET DATA TYPE TEXT;
