"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import { launchScrapping } from "@/services";
import { PlayerUI } from "@/types";
import { countries, isoToEmoji } from "@/utils/countries";
import { useRouter } from "next/navigation";
import { AutoComplete } from "../autocomplete";

type Props = {
  country: string;
  searchName: string;
  setSearchName: (value: string) => void;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  handleRefresh: () => void;
  isFetching: boolean;
  players: PlayerUI[];
  handleValueChange: (value: string) => void;
  children: React.ReactNode;
};

const Toolbar = ({
  country,
  searchName,
  setSearchName,
  selectedValue,
  setSelectedValue,
  handleRefresh,
  isFetching,
  players,
  handleValueChange,
  children,
}: Props) => {
  const router = useRouter();

  const debouncedSearchName = useDebounce(searchName, 500);
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

  return (
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
        {children}
      </div>
    </div>
  );
};

export default Toolbar;
