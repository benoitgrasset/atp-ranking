"use client";

import { NoData } from "@/components/NoData";
import { Card, CardContent } from "@/components/ui/card";
import { fetchPlayersByCountry } from "@/services";
import { countries, isoToEmoji } from "@/utils/countries";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DataTableViewOptions from "../table/DataTableViewOptions";
import { columns } from "../table/columns";
import PlayersTable from "./PlayersTable";
import Toolbar from "./Toolbar";

const year = new Date().getFullYear();

export default function Players() {
  const [country, setCountry] = useState("FRA");
  const [searchName, setSearchName] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

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
      <Toolbar
        country={country}
        searchName={searchName}
        setSearchName={setSearchName}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        handleRefresh={handleRefresh}
        isFetching={isFetching}
        players={players}
        handleValueChange={handleValueChange}
      >
        <DataTableViewOptions columns={columns} />
      </Toolbar>

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
