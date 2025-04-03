import PlayerDetails from "../../components/player/PlayerDetails";

export default async function PlayerOverviewPage({
  params,
}: {
  params: Promise<{
    player: string;
  }>;
}) {
  const { player } = await params;
  const formattedPlayerName = decodeURI(player);

  return (
    <div>
      <h1 className="pl-4">Player Overview: {formattedPlayerName}</h1>
      <PlayerDetails name={player} />
    </div>
  );
}
