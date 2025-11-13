fetch("./DataFromAPI/Bus.json")
  .then((response) => response.json())
  .then((data) => {
    const departures = data.Departure.map((element) => ({
      stop: element.stop,
      time: element.time,
      line: element.line,
      rtTime: element.rtTime,
      line: element.ProductAtStop.line,
      direction: element.direction,
    }));
    console.log(departures);

    const bustider = document.getElementById("bustider");
    departures.forEach((element) => {
      const item = document.createElement("h3");
      item.textContent = `Linje ${element.line} mod ${element.direction} - Afgangstid: ${element.time} (Real-tid: ${element.rtTime})`;
      bustider.append(item);
    });
  })
  .catch((error) => console.error("Fejl ved bustider", error));
