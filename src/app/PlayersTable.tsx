"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { isoToEmoji } from "@/constant";
import { Keys, Player } from "@/types";
import { cx } from "class-variance-authority";
import { useEffect, useState } from "react";

const countries = [
  { code: "FRA", name: "France", flagCode: "FR" },
  { code: "USA", name: "United States", flagCode: "US" },
  { code: "ESP", name: "Spain", flagCode: "ES" },
  { code: "GBR", name: "United Kingdom", flagCode: "GB" },
  { code: "GER", name: "Germany", flagCode: "DE" },
  { code: "ITA", name: "Italy", flagCode: "IT" },
  { code: "ARG", name: "Argentina", flagCode: "AR" },
  { code: "AUS", name: "Australia", flagCode: "AU" },
  { code: "AUT", name: "Austria", flagCode: "AT" },
  { code: "BEL", name: "Belgium", flagCode: "BE" },
  { code: "BRA", name: "Brazil", flagCode: "BR" },
  { code: "CAN", name: "Canada", flagCode: "CA" },
  { code: "CHI", name: "Chile", flagCode: "CL" },
  { code: "SRB", name: "Serbia", flagCode: "RS" },
  { code: "CRO", name: "Croatia", flagCode: "HR" },
  { code: "CZE", name: "Czech Republic", flagCode: "CZ" },
  { code: "DEN", name: "Denmark", flagCode: "DK" },
  { code: "ECU", name: "Ecuador", flagCode: "EC" },
  { code: "EST", name: "Estonia", flagCode: "EE" },
  { code: "FIN", name: "Finland", flagCode: "FI" },
  { code: "GRE", name: "Greece", flagCode: "GR" },
  { code: "HUN", name: "Hungary", flagCode: "HU" },
  { code: "IRL", name: "Ireland", flagCode: "IE" },
  { code: "JPN", name: "Japan", flagCode: "JP" },
  { code: "RUS", name: "Russia", flagCode: "RU" },
];

export default function PlayersTable() {
  const [sortKey, setSortKey] = useState<Keys>("ranking");
  const [sortOrder, setSortOrder] = useState("asc");
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("FRA");

  const handleChange = (value: string) => {
    setCountry(value);
  };

  useEffect(() => {
    fetch("/api/scrape?country=" + country)
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.data);
        setLoading(false);
      });
  }, [country]);

  if (!players || players.length === 0) {
    return (
      <Card className="p-4 max-w-3xl mx-auto mt-6">
        <CardContent>
          <p>No data available.</p>
        </CardContent>
      </Card>
    );
  }

  const nbTop100 = players.filter((player) => player.ranking <= 100).length;
  const rankedAt = players[0]?.rankedAt;

  const sortedPlayers = [...players].sort((a, b) => {
    if (typeof a[sortKey] === "string") {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (typeof b[sortKey] === "string") {
      return sortOrder === "asc" ? 1 : -1;
    }
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
  const flag = isoToEmoji(
    countries.find((c) => c.code === country)?.flagCode || ""
  );
  const countryName = countries.find((c) => c.code === country)?.name;

  return (
    <>
      <div className="w-1/2 ml-auto">
        <Select onValueChange={handleChange} value={country}>
          <SelectTrigger>
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {isoToEmoji(country.flagCode)} {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Card className="p-4 max-w-3xl mx-auto mt-6">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">
            ATP Ranked {countryName} Players {flag}
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p className="mb-4">
                There are <b>{players.length}</b> {countryName} players in the
                ATP ranking, including <b>{nbTop100}</b> in the top 100.
              </p>
              <p className="mb-4">
                <i>Last updated on {rankedAt}.</i>
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Index</TableHead>
                    <TableHead onClick={() => handleSort("ranking")}>
                      # Ranking
                    </TableHead>
                    <TableHead onClick={() => handleSort("points")}>
                      Points
                    </TableHead>
                    <TableHead onClick={() => handleSort("name")}>
                      Name
                    </TableHead>
                    <TableHead onClick={() => handleSort("birthDate")}>
                      Birth Date
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
                        <TableCell>{index + 1}</TableCell>
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
    </>
  );
}
