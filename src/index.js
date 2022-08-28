// const apiKey = "451bc985c8260a70ae8fc1c1627aed25";
// const apiKey = "bd8e113f7e0c7e81c27e7f9636cbc851";
// const apiKey = "2b906cc87c244677c15f8d1531da22aa";
const apiKey = "eb2ee96fce77dd8a4eaad97e550c01d8";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
let units = "metric";

let viewTime = document.querySelector("#view-time");
let temperature;
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];


function displayForecast(lat, lon){
  const forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&cnt=6&appid=${apiKey}&units=metric`;
  // const forecastURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=6&appid=${apiKey}&units=metric`;
  // console.log(forecastURL)
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = "";
  axios.get(forecastURL).then((res)=>{
    // console.log(res.data)
    const forecastDays = res.data.daily;
    forecastDays.forEach((day)=>{
      let dayTime = new Date(day.dt*1000);
      // let date = dayTime.getDay()
      forecastElement.innerHTML += `<div class="col-2">
                      <div class="weather-forecast-date">
                        ${weekDays[dayTime.getDay()]}
                      </div>
                      <img src="http://openweathermap.org/img/wn/${
                        day.weather[0].icon
                      }@2x.png" alt="" width="42" />
                      <div>
                        ${day.weather[0].main}
                      </div>
                      <div class="weather-forecast-tmp">
                        <span class="weather-forecast-maxTmp">
                          ${Math.round(day.temp.max)}°C/
                        </span>
                        <span class="weather-forecast-minTmp">${Math.round(
                          day.temp.min
                        )}°C</span>
                      </div>
                    </div>`;
    })
  })
  
}

getAndSetInfo('Tehran');

let cityInputForm = document.querySelector("#cityinputform");
cityInputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let inputCityName = document.querySelector("#inputCityName");
  if (inputCityName.value) {
    getAndSetInfo(inputCityName.value);
  }
});

function tofahrenheit(tmp) {
  return (tmp * 9) / 5 + 32;
}

let celsiusWant = document.querySelector("#celsius-link");
celsiusWant.addEventListener("click", (event) => {
  event.preventDefault();
  let temperatureView = document.querySelector("#temperature");
  temperatureView.innerHTML = `Temperature: ${temperature}`;
});

let fahrenheitWant = document.querySelector("#fahrenheit-link");
fahrenheitWant.addEventListener("click", (event) => {
  event.preventDefault()
  let fatmp = tofahrenheit(temperature);
  let temperatureView = document.querySelector("#temperature");
  temperatureView.innerHTML = `Temperature: ${fatmp}`;
});

function getAndSetInfo(cityName){
  let time = new Date();
  viewTime.innerHTML = `Last updated: ${weekDays[time.getDay()]}  ${
    time.getHours() < 10 ? "0" : ""
  }${time.getHours()}:${time.getMinutes() < 10 ? "0" : ""}${time.getMinutes()}`;

  const cityUrl = `${baseUrl}?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(cityUrl).then((res) => {
    let maxTmp, minTmp, Wind, Mood, Humidity;
    // console.log(res.data);
    temperature = res.data.main.temp;
    temperature = Math.round(temperature);

    Mood = res.data.weather[0].main;
    let cityMood = document.querySelector("#cityMood");
    cityMood.innerHTML = Mood;

    let viewNameCity = document.querySelector("#view-name-city");
    viewNameCity.innerHTML = cityName;

    let tempratureView = document.querySelector("#temperature");
    tempratureView.innerHTML = `Temperature: ${temperature}`;

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
    WindWiew.innerHTML = `Wind: ${Wind} km/h`;

    // console.log('before')
    displayForecast(res.data.coord.lat, res.data.coord.lon);
  });
}

// let currentForm = document.querySelector("#currentinputform");
// currentForm.addEventListener("submit", setCurrentInfo);
// function setCurrentInfo(event) {
//   event.preventDefault();
//   let lat, lon;
//   navigator.geolocation.getCurrentPosition((position) => {
//     lat = position.coords.latitude;
//     lon = position.coords.longitude;
//     // console.log(lat);
//     // console.log(lon);

//     const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
//     axios.get(url).then((res) => {
//       let temperature,
//         currentCityName,
//         maxCurrentTmp,
//         minCurrentTmp,
//         currentWind,
//         currentMood,
//         currentHumidity;

//       currentCityName = res.data.name;
//       let view_current_city = document.querySelector("#view-current-city");
//       view_current_city.innerHTML = currentCityName;

//       temperature = res.data.main.temp;
//       temperature = Math.round(temperature);
//       let currentTemperature = document.querySelector("#current-temperature");
//       currentTemperature.innerHTML = `Current temperature:  ${temperature}°C`;

//       currentMood = res.data.weather[0].main;
//       let currentMoodView = document.querySelector("#currentMood");
//       currentMoodView.innerHTML = currentMood;

//       maxCurrentTmp = res.data.main.temp_max;
//       maxCurrentTmp = Math.round(maxCurrentTmp);
//       minCurrentTmp = res.data.main.temp_min;
//       minCurrentTmp = Math.round(minCurrentTmp);
//       let currentMaxandMin = document.querySelector("#currentMaxandMin");
//       currentMaxandMin.innerHTML = `${minCurrentTmp}°C/${maxCurrentTmp}°C`;

//       currentHumidity = res.data.main.humidity;
//       let currentHumidityView = document.querySelector("#currentHumidity");
//       currentHumidityView.innerHTML = `Humidity: ${currentHumidity}%`;

//       currentWind = res.data.wind.speed;
//       let currentWindWiew = document.querySelector("#currentWind");
//       currentWindWiew.innerHTML = `Wind: ${currentWind}km/h`;
//     });
//   });
// }
