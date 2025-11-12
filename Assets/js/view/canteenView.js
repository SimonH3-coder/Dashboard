function capitalize(string) {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function showCanteenLoading(container) {
  container.innerHTML = '<p class="canteen-loading">Henter kantinemenu...</p>'
}

export function showCanteenError(container) {
  container.innerHTML =
    '<p class="canteen-error">Kunne ikke hente kantinemenu.</p>'
}

export function showCanteenNoData(container) {
  container.innerHTML =
    '<p class="canteen-empty">Ingen menu at vise for resten af ugen.</p>'
}

export function renderCanteenMenu(container, week, days) {
  const itemsHtml = days
    .map(
      day => `
      <li class="canteen-item">
        <span class="canteen-day">${capitalize(day.DayName)}:</span>
        <span class="canteen-dish">${day.Dish}</span>
      </li>
    `
    )
    .join('')

  container.innerHTML = `
    <div class="canteen">
      <div class="canteen-header">
        <div class="canteen-icon"></div>
        <div class="canteen-title-wrap">
          <span class="canteen-title">UGENS MENU</span>
        </div>
      </div>
      <ul class="canteen-list">
        ${itemsHtml}
      </ul>
    </div>
  `
}
