// Search Input
function updateWeather(response) {
  let temperatureElement = document.querySelector('#temperature');
  let temperature = response.data.temperature.current;
  let currentCity = document.querySelector('#current-city');
  let descriptionElement = document.querySelector('#weather-description');
  let humidityElement = document.querySelector('#humidity');
  let windSpeedElement = document.querySelector('#wind-speed');
  let timeElement = document.querySelector('#current-date');
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector('#icon');

  currentCity.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img class="current-temperature-icon" src="${response.data.condition.icon_url}" />`;
}

// Format Date
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  // Call API
  let apiKey = 'b7b6b373ccb0f67b2a046d364t6c1oaf';
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  // Update UI
  axios.get(apiUrl).then(updateWeather);
}

function handleSearch(e) {
  e.preventDefault();
  let searchInput = document.querySelector('#search-input');
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector('#search-form');
searchFormElement.addEventListener('submit', handleSearch);

function displayForecast() {
  let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  let forecastHtml = '';

  days.forEach(function (day) {
    forecastHtml += `
    <div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">🌤️</div>
    <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">
    <strong>15º</strong>
    </div>
    <div class="weather-forecast-temperature">9º</div>
    </div>
    </div>`;
  });
  let forecastElement = document.querySelector('#forecast');
  forecastElement.innerHTML = forecastHtml;
}

searchCity('Sydney');
displayForecast();
