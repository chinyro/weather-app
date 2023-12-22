function currentTemp(response) {
  let tempElement = document.querySelector('#temperature');
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector('#current-city');
  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = temperature;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector('#search-input');
  let city = searchInputElement.value;

  let apiKey = 'b7b6b373ccb0f67b2a046d364t6c1oaf';
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentTemp);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', search);

let currentDateELement = document.querySelector('#current-date');
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
