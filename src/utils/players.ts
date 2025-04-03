import { Player } from "@/types";
import { calculateProgression } from ".";

export const buildPlayer = (rankingPlayers: Player[], racePlayers: Player[]) =>
  rankingPlayers.map((rankingPlayer) => {
    const racePlayer = racePlayers.find((p) => p.name === rankingPlayer.name);
    if (racePlayer === undefined) {
      console.error("Player not found: ", rankingPlayer.name);
    }

    const raceRanking = racePlayer?.ranking || 0;
    const racePoints = racePlayer?.points || 0;
    const progression = calculateProgression(
      rankingPlayer.ranking,
      raceRanking
    );
    return {
      ...rankingPlayer,
      raceRanking,
      racePoints,
      progression,
    };
  });
