"use client";

import { NoData } from "@/components/NoData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import { fetchPlayersByCountry, launchScrapping } from "@/services";
import { countries, isoToEmoji } from "@/utils/countries";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AutoComplete } from "../autocomplete";
import { columns } from "../table/columns";
import DataTableViewOptions from "../table/DataTableViewOptions";
import PlayersTable from "./PlayersTable";

const year = new Date().getFullYear();

export default function Players() {
  const [country, setCountry] = useState("FRA");
  const [searchName, setSearchName] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const router = useRouter();

  const debouncedSearchName = useDebounce(searchName, 500);

  const handleValueChange = (value: string) => {
    setCountry(value);
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["ranking", country],
    queryFn: () => fetchPlayersByCountry(country),
    initialData: [],
  });

  if (!data) {
    return <NoData>No data available.</NoData>;
  }

  const players = data.map((player) => ({
    ...player,
    birthDate: year - player.age,
  }));

  const nameList = players
    .map((player) => ({
      value: player.name,
      label: player.name,
    }))
    .filter((player) => {
      return player.label
        .toLowerCase()
        .includes(debouncedSearchName.toLowerCase());
    });

  const nbTop100 = players.filter((player) => player.ranking <= 100).length;
  const rankedAt = players[0]?.rankedAt;

  const filteredPlayers = players.filter((player) => {
    return player.name.toLowerCase().includes(selectedValue.toLowerCase());
  });

  const handleRefresh = () => {
    refetch();
  };

  const flag = isoToEmoji(
    countries.find((c) => c.code === country)?.flagCode || ""
  );
  const countryName = countries.find((c) => c.code === country)?.name || "";

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <AutoComplete
          placeholder="Search player..."
          selectedValue={selectedValue}
          onSelectedValueChange={setSelectedValue}
          searchValue={searchName}
          onSearchValueChange={setSearchName}
          items={nameList || []}
          isLoading={isFetching}
          emptyMessage="No players found."
        />
        <div className="min-w-60">
          <Select onValueChange={handleValueChange} value={country}>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.flagCode && isoToEmoji(country.flagCode)}{" "}
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleRefresh}>Refresh</Button>
          <Button onClick={() => launchScrapping(country)}>Scrape</Button>
          <Button onClick={() => router.push("/chart")}>Graph</Button>
          <DataTableViewOptions columns={columns} />
        </div>
      </div>

      <Card className="p-4 max-w-8xl mx-auto mt-6">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">
            ATP Ranked {countryName} Players {flag}
          </h2>
          <p className="mb-4">
            There are <b>{players.length}</b> {countryName} players in the ATP
            ranking, including <b>{nbTop100}</b> in the top 100.
          </p>
          <p className="mb-4">
            <i>Last updated on {rankedAt}.</i>
          </p>
          <PlayersTable players={filteredPlayers} isFetching={isFetching} />
        </CardContent>
      </Card>
    </>
  );
}
