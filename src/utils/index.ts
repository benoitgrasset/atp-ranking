export const calculateProgression = (ranking: number, raceRanking: number) => {
  if (raceRanking === 0) {
    return 0;
  }
  let progression = ranking - raceRanking;
  const factor = 1 - Math.trunc(ranking / 100) * 0.12;
  progression = Math.round(progression * factor);
  return progression;
};
