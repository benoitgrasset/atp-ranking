import { Player } from "@/types";
import { NextRequest } from "next/server";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { scrape } from "../scrape";

const stealth = StealthPlugin();
puppeteerExtra.use(stealth);

// ATP URLS
const ATP_RACE_URL =
  "https://www.atptour.com/en/rankings/singles-race-to-turin";
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
      ? `${ATP_RACE_URL}?region=${region}&rankRange=${rankRange}`
      : `${ATP_RACE_URL}?rankRange=${rankRange}`;

    const JSONResponse: Player[] = await scrape(url, "race");

    cache = { timestamp: Date.now(), data: JSONResponse };

    console.log("✅ ATP Race Rankings scraped successfully");

    return Response.json({ success: true, data: JSONResponse });
  } catch (error) {
    console.error("❌ Error scraping Race Rankings", error);
    return Response.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
