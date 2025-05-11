import { getAllPlayers } from "@/db/services";
import { LIMIT } from "@/shared";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const country = req.nextUrl.searchParams.get("country") || "all";
  const limit: number = Number(req.nextUrl.searchParams.get("limit")) || LIMIT;

  try {
    // Get the players from the DB based on the country
    const players = await getAllPlayers(country, limit);

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
};
