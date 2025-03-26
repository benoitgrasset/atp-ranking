import { Player } from "@/types";

export const fetchPlayers = async (country: string): Promise<Player[]> => {
  const url = "/api/ranking?country=" + country;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((error) => {
      throw new Error(error);
    });
};

export const launchScrapping = async (country: string) => {
  const url = `/api/scrape?country=${country}`;

  return fetch(url)
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error);
    });
};
