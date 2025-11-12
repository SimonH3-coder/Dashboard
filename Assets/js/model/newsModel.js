import { fetchAPI } from "./fetchAPIController.js";

export const fetchNews = async () => {
  const url = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23";
  const data = await fetchAPI(url);

  if (!data || !data.items) {
    console.error("Ingen nyhedsdata modtaget");
    return ["Kunne ikke hente nyheder"];
  }

  return data.items.slice(0, 10).map((item) => item.title);
};
