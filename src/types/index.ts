export type Player = {
  index: number;
  ranking: number;
  points: number;
  raceRanking: number;
  racePoints: number;
  progression: number | null;
  name: string;
  rankedAt: string;
  birthDate: number;
  age: number;
  country: string;
};

export type Keys = keyof Player;
