import { Player } from "@/types";
import { db } from ".";

export const getAllPlayers = async (country: string, limit = 1500) =>
  await db.player.findMany({
    orderBy: {
      ranking: "asc",
    },
    where: {
      country: country === "all" ? undefined : country,
    },
    take: limit,
  });

export const getPlayerByNameFromDb = async (name: string) =>
  await db.player.findUnique({
    where: {
      name,
    },
  });

export const savePlayersToDB = (players: Player[]) =>
  db.player
    .createMany({
      data: players,
      skipDuplicates: true,
    })
    .catch((error) => {
      console.error("❌ Error saving data to DataBase ⛁", error);
    });

export async function getPlayerRankingHistory(playerId: string) {
  const history = await db.playerRankingHistory.findMany({
    where: { playerId },
    orderBy: { updatedAt: "asc" },
  });

  return history;
}

const updateRankingHistory = async (
  playerId: string,
  newRanking: number,
  newPoints: number
) => {
  await db.$transaction([
    db.playerRankingHistory.create({
      data: {
        playerId,
        ranking: newRanking,
        updatedAt: new Date(),
        points: newPoints,
        category: "ATP_SINGLES",
      },
    }),
    db.player.update({
      where: { id: playerId },
      data: {
        ranking: newRanking,
      },
    }),
  ]);
};

export const updatePlayerRankingHistory = async (
  playerName: string,
  newRanking: number,
  newPoints: number
) => {
  const player = await db.player.findUnique({
    where: { name: playerName },
    select: { ranking: true, id: true },
  });

  if (!player) {
    throw new Error("Player not found");
  }

  const playerId = player.id;

  if (player.ranking !== newRanking) {
    await updateRankingHistory(playerId, newRanking, newPoints);
  }
};
