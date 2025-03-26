"use client";

import { NoData } from "@/components/NoData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchPlayers, launchScrapping } from "@/services";
import { Keys } from "@/types";
import { countries, isoToEmoji } from "@/utils/countries";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PlayersTable from "./PlayersTable";

export default function Players() {
  const [sortKey, setSortKey] = useState<Keys>("ranking");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [country, setCountry] = useState("FRA");
  const [name, setName] = useState("");

  const handleValueChange = (value: string) => {
    setCountry(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const {
    data: players,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ranking", country],
    queryFn: () => fetchPlayers(country),
  });

  if (!players) {
    return <NoData>No data available.</NoData>;
  }

  const nbTop100 = players.filter((player) => player.ranking <= 100).length;
  const rankedAt = players[0]?.rankedAt;

  const filteredPlayers = players.filter((player) => {
    return player.name.toLowerCase().includes(name.toLowerCase());
  });

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (typeof a[sortKey] === "string") {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (typeof b[sortKey] === "string") {
      return sortOrder === "asc" ? 1 : -1;
    }

    const valA = a[sortKey] || NaN;
    const valB = b[sortKey] || NaN;

    return sortOrder === "asc" ? valA - valB : valB - valA;
  });

  const handleSort = (key: Keys) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const flag = isoToEmoji(
    countries.find((c) => c.code === country)?.flagCode || ""
  );
  const countryName = countries.find((c) => c.code === country)?.name || "";

  const renderCardContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <>
        <p className="mb-4">
          There are <b>{players.length}</b> {countryName} players in the ATP
          ranking, including <b>{nbTop100}</b> in the top 100.
        </p>
        <p className="mb-4">
          <i>Last updated on {rankedAt}.</i>
        </p>
        <PlayersTable
          players={sortedPlayers}
          handleSort={handleSort}
          sortKey={sortKey}
          sortOrder={sortOrder}
        />
      </>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search player..."
          value={name}
          onChange={handleChange}
        />
        <div className="min-w-60">
          <Select onValueChange={handleValueChange} value={country}>
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
        <div className="flex items-center gap-3">
          <Button onClick={handleRefresh}>Refresh</Button>
          <Button onClick={() => launchScrapping(country)}>Scrape</Button>
        </div>
      </div>

      <Card className="p-4 max-w-4xl mx-auto mt-6">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">
            ATP Ranked {countryName} Players {flag}
          </h2>
          {renderCardContent()}
        </CardContent>
      </Card>
    </>
  );
}
