import { TableCell } from "@/components/ui/table";
import Link from "next/link";

type Props = {
  getValue: () => string;
};

const PlayerCell = ({ getValue }: Props) => {
  const name = getValue();
  return (
    <TableCell>
      <Link href={`/${encodeURI(name)}`}>{name}</Link>
    </TableCell>
  );
};

export default PlayerCell;
