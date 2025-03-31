"use client";

import { getPlayerByName } from "@/services";
import { useQuery } from "@tanstack/react-query";

const year = new Date().getFullYear();

const Player = ({ name }: { name: string }) => {
  const { data: player } = useQuery({
    queryKey: ["player", name],
    queryFn: () => getPlayerByName(name),
  });

  if (!player) {
    return <div>Loading...</div>;
  }

  const birthDate = year - player.age;

  return (
    <div>
      <h2>{player.name}</h2>
      <p>Ranking: {player.ranking}</p>
      <p>Points: {player.points}</p>
      <p>Age: {player.age}</p>
      <p>Birth Date: {birthDate}</p>
    </div>
  );
};

export default Player;
