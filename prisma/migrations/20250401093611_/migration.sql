/*
  Warnings:

  - You are about to drop the `PlayerRankingHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `player` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RankingCategory" AS ENUM ('ATP_SINGLES', 'ATP_DOUBLES', 'ATP_RACE_TO_TURIN', 'ATP_NEXT_GEN_RACE', 'ATP_DOUBLES_RACE', 'WTA_SINGLES', 'WTA_DOUBLES');

-- DropForeignKey
ALTER TABLE "PlayerRankingHistory" DROP CONSTRAINT "PlayerRankingHistory_playerId_fkey";

-- DropTable
DROP TABLE "PlayerRankingHistory";

-- DropTable
DROP TABLE "player";

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ranking" INTEGER NOT NULL,
    "raceRanking" INTEGER NOT NULL,
    "racePoints" INTEGER NOT NULL,
    "progression" INTEGER,
    "points" INTEGER NOT NULL,
    "rankedAt" TEXT NOT NULL,
    "birthDate" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player2" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ranking" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "ranking" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "category" "RankingCategory" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_playerId_key" ON "Ranking"("playerId");

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
