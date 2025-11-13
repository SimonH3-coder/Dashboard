console.log("fetch.js IS RUNNING");

// IMPORTANT: Path is relative to index.html inside Dashboard/
const BUS_URL = "./DataFromAPIs/Bus.json";

// Fetch JSON
async function fetchBusData() {
  console.log("Loading:", BUS_URL);

  const response = await fetch(BUS_URL);
  if (!response.ok) {
    throw new Error(`HTTP fejl: ${response.status} ${response.statusText}`);
  }

  console.log("Bus.json LOADED");
  return response.json();
}

// Parse bus departures into JavaScript objects
function parseDepartures(data) {
  console.log("Parsing departures...");

  if (!data || !Array.isArray(data.Departure)) {
    console.log("No departures found in JSON");
    return [];
  }

  return data.Departure.map((element) => {
    const dateStr = element.rtDate || element.date;
    const timeStr = element.rtTime || element.time;

    const [year, month, day] = dateStr.split("-").map(Number);
    const [hour, minute] = timeStr.split(":").map(Number);

    const departureDate = new Date(year, month - 1, day, hour, minute, 0, 0);

    return {
      line: element.ProductAtStop?.line || element.line,
      direction: element.direction,
      departureDate,
      timeLabel: timeStr.slice(0, 5), // "HH:MM"
    };
  });
}

// Calculate minutes from now
function getMinutesUntil(departureDate) {
  const diffMs = departureDate - new Date();
  return Math.floor(diffMs / 60000);
}

// Render items into #bustider
function renderDepartures(departures) {
  console.log("Rendering...");

  const bustider = document.getElementById("bustider");
  if (!bustider) {
    console.log("ERROR: #bustider not found in DOM");
    return;
  }

  bustider.innerHTML = "";

  const upcoming = departures
    .map((d) => ({ ...d, minutesUntil: getMinutesUntil(d.departureDate) }))
    .filter((d) => d.minutesUntil >= 0)
    .sort((a, b) => a.departureDate - b.departureDate)
    .slice(0, 6);

  console.log("Upcoming departures:", upcoming);

  if (upcoming.length === 0) {
    bustider.innerHTML = "<h3>Ingen kommende afgange</h3>";
    return;
  }

  upcoming.forEach((d) => {
    const mins = d.minutesUntil === 0 ? "Nu" : `${d.minutesUntil} min`;
    const item = document.createElement("h3");
    item.textContent = `${d.line} ${d.direction}  ${d.timeLabel} (${mins})`;
    bustider.appendChild(item);
  });
}

// Load + render
async function updateBusTimes() {
  console.log("updateBusTimes() CALLED");

  try {
    const data = await fetchBusData();
    const departures = parseDepartures(data);
    renderDepartures(departures);

  } catch (err) {
    console.error("Fejl ved bustider", err);
  }
}

// First run
updateBusTimes();

// Auto-update every 30 seconds
setInterval(updateBusTimes, 30000);
