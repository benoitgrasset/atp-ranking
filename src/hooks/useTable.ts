import { ColumnsType } from "@/components/table/columns";
import { PlayerUI } from "@/types";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

type ColumnSort = {
  id: string;
  desc: boolean;
};
type SortingState = ColumnSort[];

export const useTable = (players: PlayerUI[], columns: ColumnsType) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data: players,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    sortDescFirst: true,
  });

  return {
    table,
    sorting,
  };
};
