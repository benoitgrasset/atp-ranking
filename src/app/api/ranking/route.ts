import { Player } from "@/types";
import { NextRequest } from "next/server";
import { scrape } from "../scrape";

// ATP URLS
const ATP_SINGLES_URL = "https://www.atptour.com/en/rankings/singles";
const rankRange = "1-1500";

let cache: { timestamp: number; data: Player[] | null } = {
  timestamp: 0,
  data: null,
};

export async function GET(req: NextRequest) {
  // Cache results for 1 hour
  if (cache.timestamp > Date.now() - 1000 * 60 * 60) {
    // return Response.json({ success: true, data: cache.data });
    console.log("⚠️ Using cached data");
  }

  try {
    const region = req.nextUrl.searchParams.get("country");
    const url = region
      ? `${ATP_SINGLES_URL}?region=${region}&rankRange=${rankRange}`
      : `${ATP_SINGLES_URL}?rankRange=${rankRange}`;

    const JSONResponse: Player[] = await scrape(url, "ranking");

    cache = { timestamp: Date.now(), data: JSONResponse };

    console.log("✅ ATP Rankings scraped successfully");

    // // Save the data in Postgres DB with Prisma
    // await db.player.createMany({
    //   data: JSONResponse,
    //   skipDuplicates: true,
    // });

    // Return the response as JSON with the scraped data
    return Response.json({ success: true, data: JSONResponse });
  } catch (error) {
    console.error("❌ Error scraping ATP Rankings", error);
    return Response.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
