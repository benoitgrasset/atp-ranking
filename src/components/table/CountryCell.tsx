import { TableCell } from "@/components/ui/table";
import { isoToEmoji } from "@/utils/countries";

type Props = {
  getValue: () => string;
};

const CountryCell = ({ getValue }: Props) => {
  const country = getValue();

  return (
    <TableCell>
      <span className="text-xl mr-1" title={country} aria-label={country}>
        {isoToEmoji(country)}
      </span>
      {country}
    </TableCell>
  );
};

export default CountryCell;
