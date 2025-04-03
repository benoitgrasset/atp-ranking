import { TableCell } from "@/components/ui/table";

type Props = {
  getValue: () => string;
};

const ProgressionCell = ({ getValue }: Props) => {
  const progression = getValue();
  return (
    <TableCell
      className={
        typeof progression === "number" && progression > 0
          ? "text-green-500"
          : "text-red-500"
      }
    >
      {progression}
    </TableCell>
  );
};

export default ProgressionCell;
