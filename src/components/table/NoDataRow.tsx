import { TableCell, TableRow } from "@/components/ui/table";

const NoDataRow = ({ message }: { message: string }) => {
  return (
    <TableRow>
      <TableCell>{message}</TableCell>
    </TableRow>
  );
};

export default NoDataRow;
