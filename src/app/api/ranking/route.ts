import { db } from "@/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const country = req.nextUrl.searchParams.get("country") || "FRA";

  try {
    // Get the players from the DB based on the country
    const players = await db.player.findMany({
      where: {
        country,
      },
    });

    return Response.json({ success: true, data: players });
  } catch (error) {
    console.error("❌ Error getting players from the DataBase ⛁", error);
    return Response.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
