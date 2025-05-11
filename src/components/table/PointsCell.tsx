type Props = {
  getValue: () => string;
};

const PointsCell = ({ getValue }: Props) => {
  return <div className="text-gray-400">{getValue()}</div>;
};

export default PointsCell;
