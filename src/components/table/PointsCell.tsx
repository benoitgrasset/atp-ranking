import { TableCell } from "@/components/ui/table";

type Props = {
  getValue: () => string;
};

const PointsCell = ({ getValue }: Props) => {
  return <TableCell className="text-gray-400">{getValue()}</TableCell>;
};

export default PointsCell;
