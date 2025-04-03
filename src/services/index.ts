import { Player } from "@/types";

const fetchData = async (url: string) => {
  return fetch(url)
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error);
    });
};

export const fetchPlayersByCountry = async (
  country: string
): Promise<Player[]> => {
  const url = "/api/ranking?country=" + country;
  return fetchData(url);
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
