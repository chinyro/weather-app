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
  timeElement.innerHTML = formateDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img class="current-temperature-icon" src="${response.data.condition.icon_url}" />`;
}

// Format Date
function formateDate(date) {
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

  let day = days[date.getDate()];
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

searchCity('Mexico');

// function currentTemp(response) {
//   let tempElement = document.querySelector('#temperature');
//   let temperature = Math.round(response.data.temperature.current);
//   let cityElement = document.querySelector('#current-city');
//   cityElement.innerHTML = response.data.city;
//   tempElement.innerHTML = temperature;
// }

// function search(event) {
//   event.preventDefault();
//   let searchInputElement = document.querySelector('#search-input');
//   let city = searchInputElement.value;

//   let apiKey = 'b7b6b373ccb0f67b2a046d364t6c1oaf';
//   let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

//   axios.get(apiUrl).then(currentTemp);
// }

// function formatDate(date) {
//   let minutes = date.getMinutes();
//   let hours = date.getHours();
//   let day = date.getDay();

//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }

//   if (hours < 10) {
//     hours = `0${hours}`;
//   }

//   let days = [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ];

//   let formattedDay = days[day];
//   return `${formattedDay} ${hours}:${minutes}`;
// }

// let searchForm = document.querySelector('#search-form');
// searchForm.addEventListener('submit', search);

// let currentDateELement = document.querySelector('#current-date');
// let currentDate = new Date();

// currentDateELement.innerHTML = formatDate(currentDate);
