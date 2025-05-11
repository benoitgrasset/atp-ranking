import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const TableRowSkeleton = ({
  columns,
}: {
  columns: { accessorKey: string }[];
}) => {
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
};

export default TableRowSkeleton;
