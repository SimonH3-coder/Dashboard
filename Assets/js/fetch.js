// Buslinje, adrese og afgangstid

fetch("../../DataFromAPIs/Bus.json")
  .then((response) => response.json())
  .then((data) => {
    const departures = data.Departure.map((element) => ({
      stop: element.stop,
      time: element.time,
      line: element.line,

      line: element.ProductAtStop.line,
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
