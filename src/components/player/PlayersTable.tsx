import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Keys, PlayerUI } from "@/types";
import { isoToEmoji } from "@/utils/countries";
import { cx } from "class-variance-authority";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const headers = [
  { key: "ranking", label: "Ranking" },
  { key: "points", label: "Points" },
  { key: "raceRanking", label: "Race Ranking" },
  { key: "racePoints", label: "Race Points" },
  { key: "progression", label: "Progression" },
  { key: "name", label: "Name" },
  { key: "country", label: "Country" },
  { key: "birthDate", label: "Birth Date" },
  { key: "age", label: "Age" },
];

type Props = {
  handleSort: (key: Keys) => void;
  players: PlayerUI[];
  sortKey: keyof PlayerUI;
  sortOrder: "asc" | "desc";
  isFetching?: boolean;
};

const PlayersTable = ({
  handleSort,
  players,
  sortKey,
  sortOrder,
  isFetching,
}: Props) => {
  const isSortedByAge = sortKey === "age";
  const isSortedByBirthDate = sortKey === "birthDate";

  const renderTableContent = () => {
    if (isFetching) {
      return Array.from({ length: 20 }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {headers.map((header) => (
            <TableCell key={header.key} className={"border-r-2 border-t-black"}>
              <Skeleton className={"h-4 w-full"} />
            </TableCell>
          ))}
        </TableRow>
      ));
    }
    if (players.length < 1) {
      return (
        <TableRow>
          <TableCell>No player found</TableCell>
        </TableRow>
      );
    }
    return players.map((player, index) => {
      const isTop100 = player.ranking <= 100;
      const { age, birthDate } = player;
      // If the data are sorted by age, we want to add a border to the row to separate each age group
      return (
        <TableRow
          key={index}
          className={cx({
            "border-t-2 border-t-black":
              (isSortedByAge && index > 0 && players[index - 1].age !== age) ||
              (isSortedByBirthDate &&
                index > 0 &&
                players[index - 1].birthDate !== birthDate),
            "bg-lime-100 dark:bg-lime-900": isTop100,
          })}
        >
          <TableCell className="border-r-2 border-t-black">
            {index + 1}
          </TableCell>
          <TableCell>{player.ranking}</TableCell>
          <TableCell className="text-gray-400">{player.points}</TableCell>
          <TableCell>{player.raceRanking}</TableCell>
          <TableCell className="text-gray-400">{player.racePoints}</TableCell>
          <TableCell
            className={
              typeof player.progression === "number" && player.progression > 0
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {player.progression}
          </TableCell>
          <TableCell>
            <Link href={`/${encodeURI(player.name)}`}>{player.name}</Link>
          </TableCell>
          <TableCell>
            <span
              className="text-xl mr-1"
              title={player.country}
              aria-label={player.country}
            >
              {isoToEmoji(player.country)}
            </span>
            {player.country}
          </TableCell>
          <TableCell>{player.birthDate}</TableCell>
          <TableCell>{player.age}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="border-r-2 border-t-black">Index</TableHead>
          {headers.map(({ key, label }) => (
            <TableHead key={key} onClick={() => handleSort(key as Keys)}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "py-0 px-0 h-7 hover:bg-transparent flex gap-2 items-center justify-between w-full group"
                )}
              >
                {label}
                <span className="flex flex-col">
                  <ChevronUp
                    className={cn(
                      "-mb-0.5 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity",
                      sortOrder === "asc"
                        ? "text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  />
                  <ChevronDown
                    className={cn(
                      "-mt-0.5 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity",
                      sortOrder === "desc"
                        ? "text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  />
                </span>
              </Button>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{renderTableContent()}</TableBody>
    </Table>
  );
};

export default PlayersTable;
