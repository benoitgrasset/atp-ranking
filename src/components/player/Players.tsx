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
import { useTable } from "@/hooks/useTable";
import { PlayerUI } from "@/types";
import { countries, flagEmoji } from "@/utils/countries";
import { flexRender } from "@tanstack/react-table";
import { cx } from "class-variance-authority";
import { useMemo } from "react";
import { DataTableColumnHeader } from "../table/DataTableColumnHeader";
import DataTableViewOptions from "../table/DataTableViewOptions";
import NoDataRow from "../table/NoDataRow";
import TableRowSkeleton from "../table/TableRowSkeleton";
import { columns } from "../table/columns";
import Toolbar from "./Toolbar";

type Props = {
  data: PlayerUI[];
  isFetching: boolean;
  refetch: () => void;
  country: string;
  handleValueChange: (value: string) => void;
};

export default function Players({
  data: players,
  isFetching,
  refetch,
  country,
  handleValueChange,
}: Props) {
  const nbTop100 = players.filter((player) => player.ranking <= 100).length;
  const rankedAt = players[0]?.rankedAt;

  const { table } = useTable(players, columns);

  const allColumns = useMemo(() => table.getAllColumns(), [table]);
  const rows = table.getRowModel().rows;

  const handleRefresh = () => {
    refetch();
  };

  const countryName = countries.find((c) => c.code === country)?.name || "";

  const handleSearchNameChange = (value: string) => {
    table.setGlobalFilter(value);
  };

  const renderTableContent = () => {
    if (isFetching) {
      return (
        <TableRowSkeleton columns={[{ accessorKey: "index" }, ...columns]} />
      );
    }

    if (rows.length < 1) {
      return <NoDataRow message="No player found." />;
    }

    return rows.map((row, index) => {
      // const isTop100 = row.original.ranking <= 100;
      return (
        <TableRow
          key={row.id}
          className={cx("hover:bg-gray-100 transition", {
            // "bg-lime-100 dark:bg-lime-900": isTop100,
          })}
        >
          <TableCell className="border-r-2 border-t-black">
            {index + 1}
          </TableCell>
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              className={
                cell.column.columnDef.enableSorting ? "cursor-pointer" : ""
              }
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      );
    });
  };

  return (
    <>
      <Toolbar
        country={country}
        searchName={table.getState().globalFilter}
        handleRefresh={handleRefresh}
        isFetching={isFetching}
        players={players}
        handleValueChange={handleValueChange}
        handleSearchNameChange={handleSearchNameChange}
      >
        <DataTableViewOptions columns={allColumns} />
      </Toolbar>
      <Card className="p-4 max-w-8xl mx-auto mt-6">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">
            ATP Ranked {countryName} Players {flagEmoji(country)}
          </h2>
          <p className="mb-4">
            There are <b>{players.length}</b> {countryName} players in the ATP
            ranking, including <b>{nbTop100}</b> in the top 100.
          </p>
          <p className="mb-4">
            <i>Last updated on {rankedAt}.</i>
          </p>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <TableHead className="border-r-2 border-t-black text-center">
                    Index
                  </TableHead>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      onClick={() => header.column.getToggleSortingHandler()}
                    >
                      <DataTableColumnHeader
                        column={header.column}
                        title={header.column.columnDef.header as string}
                      />
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>{renderTableContent()}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
