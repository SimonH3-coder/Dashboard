const SKEMA_API =
  'https://iws.itcn.dk/techcollege/schedules?departmentcode=smed'

async function fetchAPI(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    return await res.json()
  } catch (err) {
    console.error(`❌ Failed to fetch ${url}:`, err.message)
    return null
  }
}

export async function getSchedule() {
  const skemaRaw = await fetchAPI(SKEMA_API)
  return skemaRaw?.value ?? []
}

export function getRelevantLessons(allLessons, now = new Date()) {
  const ONE_DAY_MS = 24 * 60 * 60 * 1000
  const tomorrow = new Date(now.getTime() + ONE_DAY_MS)

  const filtered = allLessons.filter(item => {
    const start = new Date(item.StartDate)
    const isRelevantEducation =
      item.Education === 'Mediegrafiker' ||
      item.Education === 'Webudvikler'

    return isRelevantEducation && start >= now && start <= tomorrow
  })

  filtered.sort(
    (a, b) => new Date(a.StartDate) - new Date(b.StartDate)
  )

  return filtered
}
