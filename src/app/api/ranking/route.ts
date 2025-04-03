import { getAllPlayers, getPlayersByCountry } from "@/db/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const country = req.nextUrl.searchParams.get("country") || "all";

  try {
    // Get the players from the DB based on the country
    const players =
      country === "all"
        ? await getAllPlayers()
        : await getPlayersByCountry(country);

    return NextResponse.json(players, { status: 200 });
  } catch (error) {
    console.error("❌ Error getting players from the DataBase ⛁", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
