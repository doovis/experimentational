const weatherList = document.querySelector(".inputs");
const country = document.querySelector(".country");
const temperature = document.querySelector(".temperature");
const date = document.querySelector(".date");

// WEATHER API

fetch(
  "https://api.open-meteo.com/v1/forecast?latitude=51.5002&longitude=-0.1262&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation&daily=sunrise,sunset,windspeed_10m_max&timezone=Europe%2FLondon"
)
  .then((response) => {
    return response.json();
  })
  .then((api) => {
    console.log(api);

    date.textContent = `Day: ${api.daily.time[0]}`;

    /*
    api.daily.time.forEach((dates) => {
      date.textContent = dates;
    });
    */
  });
