import { Player } from "@/types";
import * as cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const stealth = StealthPlugin();
puppeteerExtra.use(stealth);

// ATP URLS
const ATP_SINGLES_URL = "https://www.atptour.com/en/rankings/singles";
const region = "FRA";
const rankRange = "1-1500";

const selector = ".mega-table";

const year = new Date().getFullYear();

let cache: { timestamp: number; data: Player[] | null } = {
  timestamp: 0,
  data: null,
};

export async function GET(_req: NextApiRequest, res: NextApiResponse) {
  if (cache.timestamp > Date.now() - 1000 * 60 * 60) {
    return res.json({ success: true, data: cache.data });
  }

  try {
    const browser = await puppeteerExtra.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(
      `${ATP_SINGLES_URL}?region=${region}&rankRange=${rankRange}`,
      {
        waitUntil: "domcontentloaded",
      }
    );

    console.log("Scraping ATP Rankings...");
    const JSONResponse: Player[] = [];

    await page.waitForSelector(selector);

    const content = await page.content();

    const $ = cheerio.load(content);

    let currentRankDate = $('select[data-key="dateWeek"] option')
      .first()
      .text()
      .trim();

    currentRankDate = currentRankDate.replace(/\./g, "-");
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

    return res.json({ success: true, data: JSONResponse });
  } catch (error) {
    console.error("Error scraping ATP Rankings", error);
    return res
      .status(500)
      .json({ success: false, error: (error as Error).message });
  }
}
