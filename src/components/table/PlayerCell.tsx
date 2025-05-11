import Link from "next/link";

type Props = {
  getValue: () => string;
};

const PlayerCell = ({ getValue }: Props) => {
  const name = getValue();
  return (
    <div>
      <Link href={`/${encodeURI(name)}`}>{name}</Link>
    </div>
  );
};

export default PlayerCell;
