import { rankRange } from "@/constant";
import { savePlayersToDB } from "@/db/services";
import { Player } from "@/types";
import { buildPlayer } from "@/utils/players";
import { scrape } from "../scrape";

// ATP URLS
const ATP_SINGLES_URL = `https://www.atptour.com/en/rankings/singles?rankRange=${rankRange}`;
const ATP_SINGLES_RACE_URL = `https://www.atptour.com/en/rankings/singles-race-to-turin?rankRange=${rankRange}`;
const ATP_NEXT_GEN_RACE_URL =
  "https://www.atptour.com/en/rankings/next-gen-race";
const ATP_DOUBLES_URL = "https://www.atptour.com/en/rankings/doubles";
const ATP_DOUBLES_RACE_URL =
  "https://www.atptour.com/en/rankings/doubles-team-rankings";

let cache: { timestamp: number; data: Player[] | null } = {
  timestamp: 0,
  data: null,
};

export async function GET() {
  // Cache results for 10 minutes
  if (cache.timestamp > Date.now() - 1000 * 60 * 10) {
    // return Response.json({ success: true, data: cache.data });
    console.log("⚠️ Using cached data");
  }

  try {
    const rankingPlayers: Player[] = await scrape(ATP_SINGLES_URL, "ranking");

    const racePlayers: Player[] = await scrape(ATP_SINGLES_RACE_URL, "race");

    const players = buildPlayer(rankingPlayers, racePlayers);

    cache = { timestamp: Date.now(), data: players };

    // Save the data in Postgres DB with Prisma
    await savePlayersToDB(players);

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
