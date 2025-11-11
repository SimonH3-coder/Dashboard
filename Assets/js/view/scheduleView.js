function formatTime(dateString) {
  const date = new Date(dateString)
  return date.toLocaleTimeString('da-DK', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function formatDayLabel(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('da-DK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export function showLoading(container) {
  container.innerHTML = '<p>Henter skema...</p>'
}

export function showNoData(container) {
  container.innerHTML = '<p>Ingen kommende tider inden for 24 timer.</p>'
}

export function showError(container) {
  container.innerHTML = '<p>Fejl ved hentning af skema.</p>'
}

export function renderSchedule(container, lessons) {
  let html = `
    <div class="schedule">
      <table class="schedule-table">
        <thead>
          <tr class="schedule-header">
            <th>Kl.</th>
            <th>Fag</th>
            <th>Uddannelse</th>
            <th>Hold</th>
            <th>Lokale</th>
          </tr>
        </thead>
        <tbody>
  `

  let lastDateKey = null

  lessons.forEach(item => {
    const dateKey = item.StartDate.slice(0, 10)

    if (dateKey !== lastDateKey) {
      const label = formatDayLabel(item.StartDate)
      const capitalized =
        label.charAt(0).toUpperCase() + label.slice(1)

      html += `
        <tr class="schedule-day-row">
          <td colspan="5">${capitalized}</td>
        </tr>
      `
      lastDateKey = dateKey
    }

    html += `
      <tr class="schedule-lesson-row">
        <td>${formatTime(item.StartDate)}</td>
        <td>${item.Subject}</td>
        <td>${item.Education}</td>
        <td>${item.Team}</td>
        <td>${item.Room || ''}</td>
      </tr>
    `
  })

  html += `
        </tbody>
      </table>
    </div>
  `

  container.innerHTML = html
}
