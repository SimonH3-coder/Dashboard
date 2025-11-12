export const getTime = () => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${hours}:${minutes}`;
};

export const getDate = () => {
  const now = new Date();
  const months = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];
  let day = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  day = day < 10 ? "0" + day : day;

  return `${day}. ${month} ${year}`;
};

export const startClock = (timeId = "clock", dateId = "date") => {
  const update = () => {
    const timeElement = document.getElementById(timeId);
    const dateElement = document.getElementById(dateId);

    if (timeElement) timeElement.textContent = getTime();
    if (dateElement) dateElement.textContent = getDate();
  };

  update();
  setInterval(update, 1000);
};
