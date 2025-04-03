import { PlayerUI } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import CountryCell from "../table/CountryCell";
import PlayerCell from "../table/PlayerCell";
import PointsCell from "../table/PointsCell";
import ProgressionCell from "../table/ProgressionCell";

export const columns = [
  { accessorKey: "ranking", header: "Ranking" },
  { accessorKey: "points", header: "Points", cell: PointsCell },
  { accessorKey: "raceRanking", header: "Race Ranking" },
  { accessorKey: "racePoints", header: "Race Points", cell: PointsCell },
  { accessorKey: "progression", header: "Progression", cell: ProgressionCell },
  { accessorKey: "name", header: "Name", cell: PlayerCell },
  {
    accessorKey: "country",
    header: "Country",
    enableSorting: false,
    cell: CountryCell,
  },
  { accessorKey: "birthDate", header: "Birth Date" },
  { accessorKey: "age", header: "Age" },
] satisfies ColumnDef<PlayerUI, string>[];

export type ColumnsType = typeof columns;
