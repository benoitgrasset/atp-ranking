import { db } from "@/db";
import { Player } from "@/types";
import * as cheerio from "cheerio";
import { NextRequest } from "next/server";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const stealth = StealthPlugin();
puppeteerExtra.use(stealth);

// ATP URLS
const ATP_SINGLES_URL = "https://www.atptour.com/en/rankings/singles";
const rankRange = "1-1500";
const selector = ".mega-table";

const year = new Date().getFullYear();

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
    const region = req.nextUrl.searchParams.get("country") || "FRA";
    const browser = await puppeteerExtra.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(
      `${ATP_SINGLES_URL}?region=${region}&rankRange=${rankRange}`,
      {
        waitUntil: "domcontentloaded",
      }
    );

    console.log("🚧 Scraping ATP Rankings...");

    await page.waitForSelector(selector);

    const content = await page.content();

    const $ = cheerio.load(content);

    let currentRankDate = $('select[data-key="dateWeek"] option')
      .first()
      .text()
      .trim();

    currentRankDate = currentRankDate.replace(/\./g, "-");

    const JSONResponse: Player[] = [];

    $(`${selector} tbody tr`).each((i, tr) => {
      const ranking = parseInt(
        $(tr)
          .find("td.rank.bold.heavy.tiny-cell")
          .text()
          .trim()
          .replace(/\D/g, ""),
        10
      );
      const player = $(tr).find(".name").text().trim();
      const age = parseInt(
        $(tr).find("td.age.small-cell").text().trim().replace(/\D/g, ""),
        10
      );
      const birthDate = year - age;
      const points = parseInt(
        $(tr).find(".points").text().trim().replace(",", ""),
        10
      );

      if (player === "" || isNaN(ranking) || isNaN(points) || isNaN(age)) {
        return;
      }

      const newPlayer: Player = {
        index: i,
        ranking: ranking,
        points: points,
        name: player,
        rankedAt: currentRankDate,
        birthDate,
        age: age,
      };

      JSONResponse.push(newPlayer);
    });

    await browser.close();

    cache = { timestamp: Date.now(), data: JSONResponse };

    console.log("✅ ATP Rankings scraped successfully");

    // Save the data in Postgres DB with Prisma
    await db.player.createMany({
      data: JSONResponse,
      skipDuplicates: true,
    });

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
