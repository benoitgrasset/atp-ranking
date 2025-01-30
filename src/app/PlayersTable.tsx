"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import players from "./players.json";

type Keys = keyof (typeof players)[number];

export default function PlayersTable() {
  const [sortKey, setSortKey] = useState<Keys>("ranking");
  const [sortOrder, setSortOrder] = useState("asc");

  const nbTop100 = players.filter((player) => player.ranking <= 100).length;
  const rankedAt = players[0].rankedAt;

  const sortedPlayers = [...players].sort((a, b) => {
    return sortOrder === "asc"
      ? a[sortKey] - b[sortKey]
      : b[sortKey] - a[sortKey];
  });

  const handleSort = (key: Keys) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <Card className="p-4 max-w-3xl mx-auto mt-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">ATP Ranked French Players 🇫🇷</h2>
        <p className="mb-4">
          There are {players.length} French players in the ATP ranking,
          including {nbTop100} in the top 100.
        </p>
        <p className="mb-4">Last updated on {rankedAt}.</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("ranking")}>
                #Ranking
              </TableHead>
              <TableHead onClick={() => handleSort("points")}>Points</TableHead>
              <TableHead onClick={() => handleSort("name")}>Name</TableHead>
              <TableHead onClick={() => handleSort("birthDate")}>
                BirthDate
              </TableHead>
              <TableHead onClick={() => handleSort("age")}>Age</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayers.map((player, index) => {
              const isTop100 = player.ranking <= 100;
              return (
                <TableRow
                  key={index}
                  className={isTop100 ? "bg-yellow-100" : ""}
                >
                  <TableCell>{player.ranking}</TableCell>
                  <TableCell>{player.points}</TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.birthDate}</TableCell>
                  <TableCell>{player.age}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
