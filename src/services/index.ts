import { Player } from "@/types";

const fetchData = async (url: string) => {
  return fetch(url)
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error);
    });
};

const fetchAndValidate = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (!data) {
    throw new Error("No data found");
  }
  if (typeof data !== "object") {
    throw new Error("Invalid data format");
  }
  return data;
};

const ATP_BASE_URL = "api/atp/rankings";
const WTA_BASE_URL = "api/wta/rankings";

export const fetchATPSinglesRankings = async (
  country: string
): Promise<Player[]> => {
  const url = `/${ATP_BASE_URL}/singles?country=` + country;
  return fetchAndValidate(url);
};

export const fetchATPDoublesRankings = async (
  country: string
): Promise<Player[]> => {
  const url = `/${ATP_BASE_URL}/doubles?country=` + country;
  return fetchAndValidate(url);
};

export const fetchATPDoublesRaceRankings = async (
  country: string
): Promise<Player[]> => {
  const url = `/${ATP_BASE_URL}/doubles-race?country=` + country;
  return fetchAndValidate(url);
};

export const fetchATPSinglesRaceRankings = async (
  country: string
): Promise<Player[]> => {
  const url = `/${ATP_BASE_URL}/singles-race?country=` + country;
  return fetchAndValidate(url);
};

export const fetchATPNextGenRaceRankings = async (
  country: string
): Promise<Player[]> => {
  const url = `/${ATP_BASE_URL}/next-gen-race?country=` + country;
  return fetchAndValidate(url);
};

export const fetchWTASinglesRankings = async (
  country: string
): Promise<Player[]> => {
  const url = `/${WTA_BASE_URL}/singles?country=` + country;
  return fetchAndValidate(url);
};

export const getPlayerByName = async (name: string): Promise<Player> => {
  const url = `/api/players/${name}`;
  return fetchData(url);
};

export const launchScrapping = async (country: string) => {
  const url = `/api/scrape?country=${country}`;

  return fetch(url)
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error);
    });
};
