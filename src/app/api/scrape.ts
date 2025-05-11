import { Player } from "@/types";
import * as cheerio from "cheerio";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const stealth = StealthPlugin();
puppeteerExtra.use(stealth);

// Selector right part of string after "#"
const parseCountry = (country: string | undefined) => {
  if (!country) return "All";

  const countryCode = country.split("#flag-")[1];

  return countryCode.toUpperCase();
};

const selector = ".mega-table";

export async function scrape(url: string, type: "ranking" | "race") {
  try {
    const browser = await puppeteerExtra.launch({ headless: true });
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    );

    await page.goto(url, {
      waitUntil: "networkidle2",
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

      const countryUseSelector = "svg.atp-flag use";
      const country = $(tr).find(countryUseSelector).attr("href");

      const ageSelector =
        type === "ranking" ? "td.age.small-cell" : "td.age.tiny-cell";
      const age = parseInt(
        $(tr).find(ageSelector).text().trim().replace(/\D/g, ""),
        10
      );
      const points = parseInt(
        $(tr).find(".points").text().trim().replace(",", ""),
        10
      );

      const imageSelector = "li.avatar img";
      const baseImageUrl = "https://www.atptour.com";

      console.log("Image selector:", $(tr).find(imageSelector).html());

      const imgSrc = $(tr).find(imageSelector).attr("src");
      const imageUrl = baseImageUrl + (imgSrc || "");

      if (player === "" || isNaN(ranking) || isNaN(points) || isNaN(age)) {
        return;
      }

      const newPlayer: Player = {
        ranking,
        points,
        raceRanking: 0,
        racePoints: 0,
        progression: 0,
        name: player,
        rankedAt: currentRankDate,
        age,
        country: parseCountry(country),
        imageUrl,
      };

      JSONResponse.push(newPlayer);
    });

    await browser.close();

    return JSONResponse;
  } catch (error) {
    console.error(`❌ Error scraping Rankings (${type})`, error);
    throw new Error("Error scraping Rankings");
  }
}
