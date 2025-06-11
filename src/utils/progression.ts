// Progression must be number | null - cannot be a string or "NaN" - Prisma does not accept NaN for integer fields
export const calculateProgression = (
  ranking: number,
  raceRanking: number
): number | null => {
  if (raceRanking === 0) {
    return null;
  }
  let progression = ranking - raceRanking;
  // If the player is in the top 100, we need to apply a factor to the progression
  // The factor is calculated based on the ranking of the player
  // The higher the ranking, the lower the factor
  const rawFactor = 1 - Math.trunc(ranking / 100) * 0.12;
  const factor = Math.max(rawFactor, 0.1);
  progression = Math.round(progression * factor);
  return progression;
};

/**
1.0 | ────────┐        
0.88|         ├───────┐    
0.76|         |       ├───────┐    
0.64|         |       |       ├───────┐    
0.52|         |       |       |       ├─── ...
0.40|         |       |       |       |
    └─────────┴───────┴───────┴───────▶ x
       0      100     200     300   400
 */
