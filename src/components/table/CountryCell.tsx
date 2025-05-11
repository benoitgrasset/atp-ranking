import { isoToEmoji } from "@/utils/countries";

type Props = {
  getValue: () => string;
};

const CountryCell = ({ getValue }: Props) => {
  const countryCode = getValue();

  return (
    <div>
      <span
        className="text-xl mr-1"
        title={countryCode}
        aria-label={countryCode}
      >
        {isoToEmoji(countryCode)}
      </span>
      {countryCode}
    </div>
  );
};

export default CountryCell;
