import { rankRange } from "@/constant";
import { db } from "@/db";
import { Player } from "@/types";
import { buildPlayer } from "@/utils/players";
import { NextRequest } from "next/server";
import { scrape } from "../scrape";

// ATP URLS
const ATP_SINGLES_URL = "https://www.atptour.com/en/rankings/singles";
const ATP_RACE_URL =
  "https://www.atptour.com/en/rankings/singles-race-to-turin";

let cache: { timestamp: number; data: Player[] | null } = {
  timestamp: 0,
  data: null,
};

export async function GET(req: NextRequest) {
  // Cache results for 10 minutes
  if (cache.timestamp > Date.now() - 1000 * 60 * 10) {
    // return Response.json({ success: true, data: cache.data });
    console.log("⚠️ Using cached data");
  }
  const region = req.nextUrl.searchParams.get("country");

  try {
    const rankingPlayers: Player[] = await scrape(
      `${ATP_SINGLES_URL}?region=${region}&rankRange=${rankRange}`,
      "ranking"
    );

    const racePlayers: Player[] = await scrape(
      `${ATP_RACE_URL}?region=${region}&rankRange=${rankRange}`,
      "race"
    );

    const players = buildPlayer(rankingPlayers, racePlayers);

    cache = { timestamp: Date.now(), data: players };

    // Save the data in Postgres DB with Prisma
    await db.player
      .createMany({
        data: players,
        skipDuplicates: true,
      })
      .catch((error) => {
        console.error("❌ Error saving data to DataBase ⛁", error);
      });

    return Response.json({ success: true, data: [] });
  } catch (error) {
    console.error("❌ Error scraping Rankings (rank or race)", error);
    return Response.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
