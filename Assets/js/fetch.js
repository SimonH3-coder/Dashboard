// Buslinje, adrese og afgangstid

fetch("../../DataFromAPIs/Bus.json")
  .then((response) => response.json())
  .then((data) => {
    const nextFive = Array.isArray(data.Departure) ? data.Departure.slice(0, 5) : [];
    const departures = nextFive.map((element) => ({
      stop: element.stop,
      time: element.time,
      // prefer ProductAtStop.line if present, otherwise fall back to element.line
      line: element.ProductAtStop?.line ?? element.line,
      direction: element.direction,
    }));
    console.log(departures);

    const bustider = document.getElementById("bustider");
    departures.forEach((element) => {
      const item = document.createElement("h3");
      item.textContent = `${element.line} ${element.direction}  ${element.time}`;
      bustider.append(item);
    });
  })
  .catch((error) => console.error("Fejl ved bustider", error));
