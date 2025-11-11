export const getTime = () => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
};

export const getDate = () => {
  const now = new Date();
  let day = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return `${day}. ${month} ${year}`;
};
