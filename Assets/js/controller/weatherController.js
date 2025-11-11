import { getWeather } from '../model/weatherModel.js'
import { showWeatherLoading, showWeatherError, renderWeather,} from '../view/weatherView.js'

async function initWeather() {
  const container = document.getElementById('weather')
  if (!container) {
    console.error('❌ Element med id="weather" blev ikke fundet')
    return
  }

  showWeatherLoading(container)

  try {
    const weather = await getWeather()
    if (!weather) {
      showWeatherError(container)
      return
    }
    renderWeather(container, weather)
  } catch (err) {
    console.error('❌ Fejl i initWeather:', err)
    showWeatherError(container)
  }
}

document.addEventListener('DOMContentLoaded', initWeather)
