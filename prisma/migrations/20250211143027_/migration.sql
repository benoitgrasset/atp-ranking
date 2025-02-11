/*
  Warnings:

  - You are about to drop the `player2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "player2";

-- CreateTable
CREATE TABLE "player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ranking" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "rankedAt" TIMESTAMP(3) NOT NULL,
    "birthDate" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);
