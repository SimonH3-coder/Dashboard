import { getSchedule, getRelevantLessons } from '../model/scheduleModel.js'
import { showLoading, showNoData, showError, renderSchedule, } from '../view/scheduleView.js'

async function initSchedule() {
  const container = document.getElementById('schedule')
  if (!container) {
    console.error('❌ Element med id="schedule" blev ikke fundet')
    return
  }

  showLoading(container)

  try {
    const allLessons = await getSchedule()
    const relevantLessons = getRelevantLessons(allLessons)

    if (!relevantLessons.length) {
      showNoData(container)
      return
    }

    renderSchedule(container, relevantLessons)
  } catch (err) {
    console.error('❌ Fejl i initSchedule:', err)
    showError(container)
  }
}

document.addEventListener('DOMContentLoaded', initSchedule)
