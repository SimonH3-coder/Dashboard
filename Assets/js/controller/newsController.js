import { fetchNews } from "../model/newsModel.js";
import { renderNewsFeed } from "../view/newsView.js";

export const startNewsFeed = async (containerId = "newsFeed") => {
  let news = await fetchNews();
  if (news.length === 0) return;

  let index = 0;
  renderNewsFeed(containerId, news[index]);
  // 5 sek
  setInterval(() => {
    index = (index + 1) % news.length;
    renderNewsFeed(containerId, news[index]);
  }, 5000);
  // 10 min
  setInterval(async () => {
    news = await fetchNews();
    index = 0;
  }, 10 * 60 * 1000);
};
