export type Player = {
  ranking: number;
  points: number;
  raceRanking: number;
  racePoints: number;
  progression: number | null;
  name: string;
  rankedAt: string;
  age: number;
  country: string;
};

export interface PlayerUI extends Player {
  birthDate: number;
}

export type Keys = keyof Player;
