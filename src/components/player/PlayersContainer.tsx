"use client";

import { NoData } from "@/components/NoData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  fetchATPDoublesRaceRankings,
  fetchATPDoublesRankings,
  fetchATPNextGenRaceRankings,
  fetchATPSinglesRaceRankings,
  fetchATPSinglesRankings,
} from "@/services";
import { Player } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useState } from "react";
import Players from "./Players";

const RANKING_CATEGORIES = [
  "atp",
  "singles",
  "singles_race",
  "next_gen_race",
  "doubles",
  "doubles_race",
] as const;

const mappedCategories: Record<RANKING_CATEGORY, string> = {
  atp: "ATP",
  singles: "Singles",
  singles_race: "Singles Race",
  next_gen_race: "Next Gen Race",
  doubles: "Doubles",
  doubles_race: "Doubles Race",
};

const mappFunctionToCategory: Record<
  RANKING_CATEGORY,
  (country: string) => Promise<Player[]>
> = {
  atp: fetchATPSinglesRankings,
  singles: fetchATPSinglesRankings,
  singles_race: fetchATPSinglesRaceRankings,
  next_gen_race: fetchATPNextGenRaceRankings,
  doubles: fetchATPDoublesRankings,
  doubles_race: fetchATPDoublesRaceRankings,
};

type RANKING_CATEGORY = (typeof RANKING_CATEGORIES)[number];

const year = new Date().getFullYear();

export default function PlayersContainer() {
  const [country, setCountry] = useQueryState("region", { defaultValue: "" });
  const [category, setCategory] = useState<RANKING_CATEGORY>(
    RANKING_CATEGORIES[1]
  );

  const handleValueChange = (value: string) => {
    setCountry(value);
  };

  const queryFn = mappFunctionToCategory[category];

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["ranking", country ? country : "all", category],
    queryFn: () => queryFn(country || "all"),
    initialData: [],
    refetchOnWindowFocus: false,
    // staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (!data) {
    return <NoData>No data available.</NoData>;
  }

  const players = data.map((player) => ({
    ...player,
    birthDate: year - player.age,
  }));

  return (
    <Tabs
      className="mb-4"
      value={category}
      onValueChange={(value) => setCategory(value as RANKING_CATEGORY)}
    >
      <TabsList>
        {RANKING_CATEGORIES.map((category) => (
          <TabsTrigger key={category} value={category}>
            {mappedCategories[category]}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={category}>
        <Players
          data={players}
          isFetching={isFetching}
          refetch={refetch}
          country={country}
          handleValueChange={handleValueChange}
        />
      </TabsContent>
    </Tabs>
  );
}
