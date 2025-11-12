const CANTEEN_API =
  'https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json'

async function fetchJSON(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    return await res.json()
  } catch (err) {
    console.error('❌ Kantine API fejlede:', err.message)
    return null
  }
}

export async function getCanteenMenu() {
  const data = await fetchJSON(CANTEEN_API)
  return data
}

export function getRemainingMenuDays(menu, now = new Date()) {
  if (!menu || !Array.isArray(menu.Days)) return []

  const dayOrder = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag']

  const jsDay = now.getDay()
  let todayIndex

  if (jsDay === 0 || jsDay === 6) {
    todayIndex = dayOrder.length
  } else {
    todayIndex = jsDay - 1
  }

  return menu.Days.filter(day => {
    const idx = dayOrder.indexOf(day.DayName.toLowerCase())
    return idx !== -1 && idx >= todayIndex
  })
}
