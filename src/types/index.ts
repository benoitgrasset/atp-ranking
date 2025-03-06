export type Player = {
  index: number;
  ranking: number;
  points: number;
  raceRanking: number;
  racePoints: number;
  progression: number;
  name: string;
  rankedAt: string;
  birthDate: number;
  age: number;
};

export type Keys = keyof Player;
