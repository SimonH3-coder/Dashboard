const API_URL = "https://www.rejseplanen.dk/api/nearbyDepartureBoard";
const ACCESS_ID = ""; // your API key Dont paste it here we will insert the env on netlify 

async function fetchNearbyDepartures() {
  const url = new URL(API_URL);

  url.searchParams.set("accessId", ACCESS_ID);
  url.searchParams.set("originCoordLat", "57.048731");
  url.searchParams.set("originCoordLong", "9.968186");
  url.searchParams.set("format", "json");

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  console.log("LIVE API LOADED");
  return response.json();
}

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
      timeLabel: timeStr.slice(0, 5), // HH:MM
    };
  });
}

function getMinutesUntil(departureDate) {
  const diffMs = departureDate - new Date();
  return Math.floor(diffMs / 60000);
}

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

  if (upcoming.length === 0) {
    bustider.innerHTML = "<h3>Ingen kommende afgange</h3>";
    return;
  }

  upcoming.forEach((d) => {
    const mins = d.minutesUntil === 0 ? "Nu" : `${d.minutesUntil} min`;

    const item = document.createElement("div");
    item.style.display = "flex";
    item.style.justifyContent = "space-between";
    item.style.alignItems = "center";
    item.style.width = "100%";
    item.style.marginBottom = "4px";

    const left = document.createElement("h3");
    left.textContent = `${d.line} ${d.direction}`;

    const right = document.createElement("h3");
    right.textContent = `${mins}`;

    item.appendChild(left);
    item.appendChild(right);

    bustider.appendChild(item);
  });
}




async function updateBusTimes() {
  console.log("updateBusTimes() CALLED");

  try {
    const data = await fetchNearbyDepartures();
    const departures = parseDepartures(data);
    renderDepartures(departures);

  } catch (err) {
    console.error("Fejl ved bustider", err);
  }
}


updateBusTimes();  
//!!!!!
//DONT FUCKING CHANGE THE TIME OR WE MIGHT LOSE THE KEY AND THE BOARD WILL CRASHH
//!!!!!
setInterval(updateBusTimes, 55000);   // update every 55 sec (safe for API limit) max 50.000 calls and we do 47.000 a month
//!!!!!
//DONT FUCKING CHANGE THE TIME OR WE MIGHT LOSE THE KEY AND THE BOARD WILL CRASHH
//!!!!!
const BUS_URL = "./DataFromAPIs/Bus.json";