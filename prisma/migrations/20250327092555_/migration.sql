/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `player` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "PlayerRankingHistory" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "ranking" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerRankingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_name_key" ON "player"("name");

-- AddForeignKey
ALTER TABLE "PlayerRankingHistory" ADD CONSTRAINT "PlayerRankingHistory_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
