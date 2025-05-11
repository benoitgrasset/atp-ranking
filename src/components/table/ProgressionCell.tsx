type Props = {
  getValue: () => string;
};

const ProgressionCell = ({ getValue }: Props) => {
  const progression = getValue();
  return (
    <div
      className={
        typeof progression === "number" && progression > 0
          ? "text-green-500"
          : "text-red-500"
      }
    >
      {progression}
    </div>
  );
};

export default ProgressionCell;
