/* eslint-disable max-len */
(function() {
  'use strickt';

  /* API WEATER*/
  const notificationElement = document.querySelector('.notification');
  const iconElement = document.querySelector('.weatherIcon');
  const tempElement = document.querySelector('.temperatureValue p');
  const descElement = document.querySelector('.temperatureDiscription p');
  const locationElement = document.querySelector('.location p');
  const key = '53a81e0901deb0e281a9e1cdf3b723b1';
  const Kelvin = 273;
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

  /* PRICE CALCULATION*/


  let pricePerRoomPerPerson;
  let totalePrice;
  const totalePriceDivElement = document.querySelector('#totalPrice');
  const roomTypeElement = document.querySelector('#validationRoomTypeOutput');
  const amountOfPeopleElement = document.querySelector('#validationAmountOfPeopleOutput');
  const breakfastElement = document.querySelector('#validationBreakfastOutput');
  const spaElement = document.querySelector('#vaidationAllInSpaOutput');
  const priceElement = document.querySelector('#validationTotalPriceOutput');
  const roomTypes = [
    {
      name: 'juniorSuite',
      price: 100,
    },
    {
      name: 'vitalRoom',
      price: 150,
    },
    {
      name: 'vitalityRoomDeluxe',
      price: 200,
    },
  ];

  /* API WEATER LOGIC*/
  weather.temperature.value = 300 - 273;
  function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
  }

  function displayWeather() {
    iconElement.innerHTML = `<img src="../image/icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
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
    const latitude = 60.4234958;
    const longitude = 22.0929899;

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
  /* PRICE CALCULATION*/
  function getPrice() {
    event.preventDefault();
    const selectedRoomType = document.getElementById('roomType').value;
    const amountOfPeople = document.getElementById('amountOfPeople').value;
    const amountOfDays = document.getElementById('amountOfDays').value;
    if (amountOfPeople < 4 || amountOfPeople < 0) {
      for (i = 0; i < roomTypes.length; i++) {
        if (roomTypes[i].name == selectedRoomType) {
          pricePerRoomPerPerson = roomTypes[i].price;
          totalePrice = pricePerRoomPerPerson * amountOfPeople * amountOfDays;
          if (document.getElementById('breakfast').checked) {
            totalePrice = totalePrice + (15 * amountOfPeople * amountOfDays);
            breakfastElement.innerHTML = `Included`;
          } else {
            breakfastElement.innerHTML = `Not Include`;
          }
          if (document.getElementById('allInSpa').checked) {
            totalePrice = totalePrice + (50 * amountOfPeople * amountOfDays);
            spaElement.innerHTML = `Included`;
          } else {
            spaElement.innerHTML = `Not Included`;
          }
        }
      }
      totalePriceDivElement.style.display= 'flex';
      roomTypeElement.innerHTML= `${selectedRoomType}`;
      amountOfPeopleElement.innerHTML = `${amountOfPeople}`;


      priceElement.innerHTML = `${totalePrice} Euro`;
    } else {
      alert('The amount of people is to much or to low');
    }
  }
  document.getElementById('btnPrice').addEventListener('click', getPrice);
})();


