import { getPlayerByNameFromDb } from "@/db/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { player: string } }
) {
  const { player: playerName } = await params;
  const formattedPlayerName = decodeURI(playerName);
  const player = await getPlayerByNameFromDb(formattedPlayerName);
  return NextResponse.json(player, { status: 200 });
}
