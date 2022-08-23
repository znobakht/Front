const apiKey = "451bc985c8260a70ae8fc1c1627aed25";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
let units = "metric";

let viewTime = document.querySelector("#view-time");
let time = new Date();
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
viewTime.innerHTML = `${weekDays[time.getDay()]}  ${
  time.getHours() < 10 ? "0" : ""
}${time.getHours()}:${time.getMinutes() < 10 ? "0" : ""}${time.getMinutes()}`;

let cityInputForm = document.querySelector("#cityinputform");
cityInputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let inputCityName = document.querySelector("#inputCityName");
  if (inputCityName.value) {
    const cityUrl = `${baseUrl}?q=${inputCityName.value}&appid=${apiKey}&units=${units}`;
    axios.get(cityUrl).then((res) => {
      let temperature, maxTmp, minTmp, Wind, Mood, Humidity;
      // console.log(res.data);
      temperature = res.data.main.temp;
      temperature = Math.round(temperature);

      Mood = res.data.weather[0].main;
      let cityMood = document.querySelector("#cityMood");
      cityMood.innerHTML = Mood;

      let viewNameCity = document.querySelector("#view-name-city");
      viewNameCity.innerHTML = inputCityName.value;

      let tempratureView = document.querySelector("#temperature");
      tempratureView.innerHTML = `Temperature: ${temperature}°C`;

      maxTmp = res.data.main.temp_max;
      maxTmp = Math.round(maxTmp);
      minTmp = res.data.main.temp_min;
      minTmp = Math.round(minTmp);
      let MaxandMin = document.querySelector("#cityMaxandMin");
      MaxandMin.innerHTML = `${minTmp}°C/${maxTmp}°C`;

      Humidity = res.data.main.humidity;
      let HumidityView = document.querySelector("#Humidity");
      HumidityView.innerHTML = `Humidity: ${Humidity}%`;

      Wind = res.data.wind.speed;
      let WindWiew = document.querySelector("#Wind");
      WindWiew.innerHTML = `Wind: ${Wind}km/h`;
    });
  }
});

let currentForm = document.querySelector("#currentinputform");
currentForm.addEventListener("submit", setCurrentInfo);
function setCurrentInfo(event) {
  event.preventDefault();
  let lat, lon;
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    // console.log(lat);
    // console.log(lon);

    const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(url).then((res) => {
      let temperature,
        currentCityName,
        maxCurrentTmp,
        minCurrentTmp,
        currentWind,
        currentMood,
        currentHumidity;

      currentCityName = res.data.name;
      let view_current_city = document.querySelector("#view-current-city");
      view_current_city.innerHTML = currentCityName;

      temperature = res.data.main.temp;
      temperature = Math.round(temperature);
      let currentTemperature = document.querySelector("#current-temperature");
      currentTemperature.innerHTML = `Current temperature:  ${temperature}°C`;

      currentMood = res.data.weather[0].main;
      let currentMoodView = document.querySelector("#currentMood");
      currentMoodView.innerHTML = currentMood;

      maxCurrentTmp = res.data.main.temp_max;
      maxCurrentTmp = Math.round(maxCurrentTmp);
      minCurrentTmp = res.data.main.temp_min;
      minCurrentTmp = Math.round(minCurrentTmp);
      let currentMaxandMin = document.querySelector("#currentMaxandMin");
      currentMaxandMin.innerHTML = `${minCurrentTmp}°C/${maxCurrentTmp}°C`;

      currentHumidity = res.data.main.humidity;
      let currentHumidityView = document.querySelector("#currentHumidity");
      currentHumidityView.innerHTML = `Humidity: ${currentHumidity}%`;

      currentWind = res.data.wind.speed;
      let currentWindWiew = document.querySelector("#currentWind");
      currentWindWiew.innerHTML = `Wind: ${currentWind}km/h`;
    });
  });
}