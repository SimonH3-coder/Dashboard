import { getWeather } from '../model/weatherModel.js'
import { showWeatherLoading, showWeatherError, renderWeather} from '../view/weatherView.js'

const REFRESH_INTERVAL_MS = 15 * 60 * 1000 // 15 minutes

async function loadWeather(container) {
  try {
    const weather = await getWeather()
    if (!weather) {
      showWeatherError(container)
      return
    }
    renderWeather(container, weather)
  } catch (err) {
    console.error('❌ Fejl i loadWeather:', err)
    showWeatherError(container)
  }
}

function initWeather() {
  const container = document.getElementById('weather')
  if (!container) {
    console.error('❌ Element med id="weather" blev ikke fundet')
    return
  }

  showWeatherLoading(container)
  loadWeather(container)

  setInterval(() => loadWeather(container), REFRESH_INTERVAL_MS)
}

document.addEventListener('DOMContentLoaded', initWeather)
