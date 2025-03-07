export const calculateProgression = (ranking: number, raceRanking: number) => {
  if (raceRanking === 0) {
    return "-";
  }
  let progression = ranking - raceRanking;
  const factor = 1 - Math.trunc(ranking / 100) * 0.12;
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
