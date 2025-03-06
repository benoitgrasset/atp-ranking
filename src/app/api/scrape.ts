import { Player } from "@/types";
import * as cheerio from "cheerio";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const stealth = StealthPlugin();
puppeteerExtra.use(stealth);

const selector = ".mega-table";

const year = new Date().getFullYear();

export async function scrape(url: string, type: "ranking" | "race") {
  const browser = await puppeteerExtra.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  console.log(`🚧 Scraping ${url}...`);

  await page.waitForSelector(selector);

  const content = await page.content();

  const $ = cheerio.load(content);

  let currentRankDate = "";
  if (type === "ranking") {
    const rankedAtSelector = $('select[data-key="dateWeek"] option');
    currentRankDate = rankedAtSelector.first().text().trim();
    currentRankDate = currentRankDate.replace(/\./g, "-");
  }

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
    const nameSelector = type === "ranking" ? ".name" : ".name.center";
    const player = $(tr).find(nameSelector).text().trim();
    const ageSelector =
      type === "ranking" ? "td.age.small-cell" : "td.age.tiny-cell";
    const age = parseInt(
      $(tr).find(ageSelector).text().trim().replace(/\D/g, ""),
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
      raceRanking: 0,
      racePoints: 0,
      progression: 0,
      name: player,
      rankedAt: currentRankDate,
      birthDate,
      age: age,
    };

    JSONResponse.push(newPlayer);
  });

  await browser.close();

  return JSONResponse;
}
