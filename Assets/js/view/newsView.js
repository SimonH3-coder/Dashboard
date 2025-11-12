export const renderNewsFeed = (containerId, newsItem) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.textContent = `📰 ${newsItem}`;
};
