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
import { Keys, Player } from "@/types";
import { cx } from "class-variance-authority";
import { useEffect, useState } from "react";

export default function PlayersTable() {
  const [sortKey, setSortKey] = useState<Keys>("ranking");
  const [sortOrder, setSortOrder] = useState("asc");
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/scrape")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.data);
        setLoading(false);
      });
  }, []);

  const nbTop100 = players.filter((player) => player.ranking <= 100).length;
  const rankedAt = players[0]?.rankedAt;

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

  const isSortedByAge = sortKey === "age";
  const isSortedByBirthDate = sortKey === "birthDate";

  return (
    <Card className="p-4 max-w-3xl mx-auto mt-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">ATP Ranked French Players 🇫🇷</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
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
                  <TableHead onClick={() => handleSort("points")}>
                    Points
                  </TableHead>
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
                  const age = player.age;
                  const birthDate = player.birthDate;
                  // If the data are sorted by age, we want to add a border to the row to separate each age group
                  return (
                    <TableRow
                      key={index}
                      className={cx({
                        "border-t-2 border-t-black":
                          (isSortedByAge &&
                            index > 0 &&
                            sortedPlayers[index - 1].age !== age) ||
                          (isSortedByBirthDate &&
                            index > 0 &&
                            sortedPlayers[index - 1].birthDate !== birthDate),
                        "bg-yellow-100": isTop100,
                      })}
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
