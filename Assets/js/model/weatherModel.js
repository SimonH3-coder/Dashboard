const WEATHER_API =
  'https://api.openweathermap.org/data/2.5/weather?q=Aalborg&appid=4d58d6f0a435bf7c5a52e2030f17682d&units=metric&lang=da'

async function fetchAPI(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    return await res.json()
  } catch (err) {
    console.error('❌ Weather fetch failed:', err.message)
    return null
  }
}

export async function getWeather() {
  const data = await fetchAPI(WEATHER_API)
  if (!data) return null

  const temp = Math.round(data.main?.temp ?? 0)
  const description = data.weather?.[0]?.description ?? ''

  return { temp, description }
}
