import { Skeleton } from "@/components/ui/skeleton";
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
import { flexRender } from "@tanstack/react-table";
import { cx } from "class-variance-authority";
import { DataTableColumnHeader } from "../table/DataTableColumnHeader";
import NoDataRow from "../table/NoDataRow";
import { columns } from "../table/columns";

type Props = {
  players: PlayerUI[];
  isFetching?: boolean;
};

const PlayersTable = ({ players, isFetching }: Props) => {
  const { table } = useTable(players, columns);

  const renderTableContent = () => {
    if (isFetching) {
      return Array.from({ length: 20 }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((column) => (
            <TableCell
              key={column.accessorKey}
              className={"border-r-2 border-t-black"}
            >
              <Skeleton className={"h-4 w-full"} />
            </TableCell>
          ))}
        </TableRow>
      ));
    }

    const rows = table.getRowModel().rows;

    if (rows.length < 1) {
      return <NoDataRow message="No player found." />;
    }

    return rows.map((row, index) => {
      const isTop100 = row.original.ranking <= 100;
      return (
        <TableRow
          key={row.id}
          className={cx("hover:bg-gray-100 transition", {
            "bg-lime-100 dark:bg-lime-900": isTop100,
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
  );
};

export default PlayersTable;
