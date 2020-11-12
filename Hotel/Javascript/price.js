/* eslint-disable max-len */
(function() {
  'use strickt';
  const notificationElement = document.querySelector('.notification');
  const iconElement = document.querySelector('.weatherIcon');
  const tempElement = document.querySelector('.temperatureValue p');
  const descElement = document.querySelector('.temperatureDiscription p');
  const locationElement = document.querySelector('.location p');

  const Kelvin = 273;

  const key = '53a81e0901deb0e281a9e1cdf3b723b1';
  const weather = {
    temperature: {
      value: 18,
      unit: 'celsius',
    },
    description: 'few clouds',
    iconId: '01d',
    city: 'London',
    country: 'GB',
  };
  weather.temperature.value = 300 - 273;
  function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
  }

  function displayWeather() {
    iconElement.innerHTML = `<i class="fas fa-sun weatherIcon"></i>`;
    tempElement.innerHTML = `${weather.temperature.value} ° <span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
  }

  tempElement.addEventListener('click', function() {
    if (weather.temperature.value === undefined) return;
    if (weather.temperature.unit === 'celsius') {
      let fahrenHeit = celsiusToFahrenheit(weather.temperature.value);
      fahrenHeit = Math.floor(fahrenHeit);
      tempElement.innerHTML = `${fahrenHeit}° <span>F<span>`;
      weather.temperature.unit = 'fahrenheit';
    } else {
      tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
      weather.temperature.unit = 'celsius';
    }
  });

  // CHECK IF BROWSER SUPPORTS GEOLOCATION
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = '<p>Browser doesn\'t Support Geolocation</p>';
  }

  function setPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getWeather(latitude, longitude);
  }

  function showError(error) {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p> ${error.message};} </p>`;
  }

  function getWeather(latitude, longitude) {
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response) {
          const data = response.json();
          console.log(data);
          return data;
        })
        .then(function(data) {
          weather.temperature.value = Math.floor(data.main.temp - Kelvin);
          weather.description = data.weather[0].description;
          weather.iconId = data.weather[0].icon;
          weather.city = data.name;
          weather.country = data.sys.country;
        })
        .then(function() {
          displayWeather();
        });
  }
})();


