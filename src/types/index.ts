export type Player = {
  index: number;
  ranking: number;
  points: number;
  name: string;
  rankedAt: string;
  birthDate: number;
  age: number;
};

export type Keys = keyof Player;
