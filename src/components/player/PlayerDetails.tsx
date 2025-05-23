"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPlayerByName } from "@/services";
import { flagEmoji } from "@/utils/countries";
import { useQuery } from "@tanstack/react-query";

const year = new Date().getFullYear();

const PlayerDetails = ({ name }: { name: string }) => {
  const { data: player, isFetching } = useQuery({
    queryKey: ["player", name],
    queryFn: () => getPlayerByName(name),
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!player) {
    return <div>Player not found.</div>;
  }

  const birthDate = year - player.age;

  return (
    <Card className="m-4 max-w-3xl">
      <CardHeader>
        <CardTitle>Player Details</CardTitle>
        <CardDescription>{`${player.name} - ${player.country}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Ranking:</span>
            <span>{player.ranking}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Points:</span>
            <span>{player.points}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Age:</span>
            <span>{player.age}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Birth Date:</span>
            <span>{birthDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Country:</span>
            <span>
              {flagEmoji(player.country)} {player.country}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerDetails;
