import "./controller/canteenController.js";
import "./controller/scheduleController.js";
import "./controller/weatherController.js";
import "./fetch.js";

import { startClock } from "./controller/renderClock.js";

document.addEventListener("DOMContentLoaded", () => {
  startClock("clock", "date");
});
