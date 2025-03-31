import Player from "../Player";

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
      <h1>Player Overview: {formattedPlayerName}</h1>
      <Player name={player} />
    </div>
  );
}
