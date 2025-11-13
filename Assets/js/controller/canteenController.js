import { getCanteenMenu, getRemainingMenuDays } from '../model/canteenModel.js'
import {
  showCanteenLoading,
  showCanteenError,
  showCanteenNoData,
  renderCanteenMenu,
} from '../view/canteenView.js'

async function initCanteen() {
  const container = document.getElementById('canteen-menu')
  if (!container) {
    console.error('❌ #canteen-menu blev ikke fundet')
    return
  }

  showCanteenLoading(container)

  try {
    const menu = await getCanteenMenu()
    if (!menu) {
      showCanteenError(container)
      return
    }

    const remainingDays = getRemainingMenuDays(menu)

    if (!remainingDays.length) {
      showCanteenNoData(container)
      return
    }

    renderCanteenMenu(container, menu.Week, remainingDays)
  } catch (err) {
    console.error('❌ Fejl i initCanteen:', err)
    showCanteenError(container)
  }
}

document.addEventListener('DOMContentLoaded', initCanteen)
