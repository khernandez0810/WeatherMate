var currentCity = document.querySelector('#currentcity');
var currentCityTemp = document.querySelector('#currentCityTemp');
var currentCityWind = document.querySelector('#currentCityWind');
var currentCityHumidity = document.querySelector('#currentCityHumidity');
var searchBtn = document.querySelector('#searchbtn');
var currentCityIcon = document.querySelector('#currentCityIcon');
var historyCard = document.getElementById("history-card");
var mainWeather = document.getElementById("main-weather");
var futureCard = document.querySelector('#future-forecast');

var day1date = document.querySelector('#date1');
var day1Icon = document.querySelector('#icon1');
var day1Temp = document.querySelector('#temp1');
var day1Wind = document.querySelector('#wind1');
var day1Hum = document.querySelector('#hum1');

var day2date = document.querySelector('#date2');
var day2Icon = document.querySelector('#icon2');
var day2Temp = document.querySelector('#temp2');
var day2Wind = document.querySelector('#wind2');
var day2Hum = document.querySelector('#hum2');

var day3date = document.querySelector('#date3');
var day3Icon = document.querySelector('#icon3');
var day3Temp = document.querySelector('#temp3');
var day3Wind = document.querySelector('#wind3');
var day3Hum = document.querySelector('#hum3');

var day4date = document.querySelector('#date4');
var day4Icon = document.querySelector('#icon4');
var day4Temp = document.querySelector('#temp4');
var day4Wind = document.querySelector('#wind4');
var day4Hum = document.querySelector('#hum4');

var day5date = document.querySelector('#date5');
var day5Icon = document.querySelector('#icon5');
var day5Temp = document.querySelector('#temp5');
var day5Wind = document.querySelector('#wind5');
var day5Hum = document.querySelector('#hum5');

var today = dayjs().format('dddd, MMMM D, YYYY');
var todayDate = document.querySelector('#today');
var searchList = document.getElementById('city-buttons');

const API_KEY = "afeb5de2076b8a55a907ef83c79b6a96";

// ✅ load saved cities once
var cities = JSON.parse(localStorage.getItem("cities")) || [];
addCities();

function saveCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

function addCityToHistory(cityName) {
  // avoid duplicates (case-insensitive)
  const exists = cities.some(c => c.toLowerCase() === cityName.toLowerCase());
  if (!exists) {
    cities.unshift(cityName); // newest first
    // optional: cap list size
    cities = cities.slice(0, 10);
    saveCities();
  }
  addCities();
}

function addCities() {
  searchList.innerHTML = "";
  for (var i = 0; i < cities.length; i++) {
    var btn = document.createElement("button");
    btn.textContent = cities[i];
    btn.classList.add("city-btn");
    searchList.appendChild(btn);
  }
}

// ✅ better pick if multiple locations come back
function pickBestGeoResult(input, results) {
  if (!results || results.length === 0) return null;

  const query = input.trim().toLowerCase();

  // If user typed "Orlando, US" or "Orlando, FL, US"
  const parts = query.split(",").map(p => p.trim()).filter(Boolean);
  const qName = parts[0] || "";
  const qCountry = parts.length >= 2 ? parts[parts.length - 1].toUpperCase() : null;

  // 1) exact name + (optional) country match
  let exact = results.find(r =>
    r.name && r.name.toLowerCase() === qName &&
    (!qCountry || (r.country && r.country.toUpperCase() === qCountry))
  );
  if (exact) return exact;

  // 2) name starts with query name
  let starts = results.find(r => r.name && r.name.toLowerCase().startsWith(qName));
  if (starts) return starts;

  // 3) fallback to first
  return results[0];
}

function fetchWeatherByCoords(lat, lon, addToHistory = false) {
  const weatherQuery =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;

  fetch(weatherQuery)
    .then((r) => r.json())
    .then((data) => {
      todayDate.textContent = today;

      const icon = data.weather[0].icon;
      currentCityIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`;

      currentCity.textContent = data.name;
      currentCityTemp.textContent = "Temp (F)  " + data.main.temp;
      currentCityWind.textContent = "Wind Speed:  " + data.wind.speed + "  mph";
      currentCityHumidity.textContent = "Humidity:  " + data.main.humidity + "  %";

      if (addToHistory) addCityToHistory(data.name);

      mainWeather.classList.remove("hide");
      historyCard.classList.remove("hide");
    });

  const futureWeatherQuery =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;

  fetch(futureWeatherQuery)
    .then((r) => r.json())
    .then((data) => {
      day1date.textContent = dayjs().add(1, "day").format("dddd, MMMM D, YYYY");
      day2date.textContent = dayjs().add(2, "day").format("dddd, MMMM D, YYYY");
      day3date.textContent = dayjs().add(3, "day").format("dddd, MMMM D, YYYY");
      day4date.textContent = dayjs().add(4, "day").format("dddd, MMMM D, YYYY");
      day5date.textContent = dayjs().add(5, "day").format("dddd, MMMM D, YYYY");

      const i1 = data.list[5].weather[0].icon;
      const i2 = data.list[13].weather[0].icon;
      const i3 = data.list[21].weather[0].icon;
      const i4 = data.list[29].weather[0].icon;
      const i5 = data.list[37].weather[0].icon;

      day1Icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${i1}@2x.png">`;
      day2Icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${i2}@2x.png">`;
      day3Icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${i3}@2x.png">`;
      day4Icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${i4}@2x.png">`;
      day5Icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${i5}@2x.png">`;

      day1Temp.textContent = "Temp: " + data.list[5].main.temp + " (F)";
      day2Temp.textContent = "Temp: " + data.list[13].main.temp + " (F)";
      day3Temp.textContent = "Temp: " + data.list[21].main.temp + " (F)";
      day4Temp.textContent = "Temp: " + data.list[29].main.temp + " (F)";
      day5Temp.textContent = "Temp: " + data.list[37].main.temp + " (F)";

      day1Wind.textContent = "Wind: " + data.list[5].wind.speed + " mph";
      day2Wind.textContent = "Wind: " + data.list[13].wind.speed + " mph";
      day3Wind.textContent = "Wind: " + data.list[21].wind.speed + " mph";
      day4Wind.textContent = "Wind: " + data.list[29].wind.speed + " mph";
      day5Wind.textContent = "Wind: " + data.list[37].wind.speed + " mph";

      day1Hum.textContent = "Humidity: " + data.list[5].main.humidity + "%";
      day2Hum.textContent = "Humidity: " + data.list[13].main.humidity + "%";
      day3Hum.textContent = "Humidity: " + data.list[21].main.humidity + "%";
      day4Hum.textContent = "Humidity: " + data.list[29].main.humidity + "%";
      day5Hum.textContent = "Humidity: " + data.list[37].main.humidity + "%";
    });
}

function fetchWeather() {
  var cityInput = document.getElementById('city').value.trim();
  if (!cityInput) return;

  // ✅ limit results so it’s less likely to pick a weird match
  var locationQuery =
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityInput)}&limit=5&appid=${API_KEY}`;

  fetch(locationQuery)
    .then(function (response) {
      if (response.status !== 200) {
        alert("Please choose a valid City");
      }
      return response.json();
    })
    .then(function (data) {
      const best = pickBestGeoResult(cityInput, data);
      if (!best) {
        alert("City not found. Try: City, CountryCode (ex: Orlando, US)");
        return;
      }

      // ✅ add clean name to history
      addCityToHistory(best.name);

      // use coords from best match
      fetchWeatherByCoords(best.lat, best.lon);
    });
}

function loadUserLocationAsDefault() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      // set addToHistory = true if you want their current city to appear in history
      fetchWeatherByCoords(latitude, longitude, true);
    },
    (err) => {
      console.log("Geolocation error:", err.message);
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

// search button
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  fetchWeather();
  mainWeather.classList.remove('hide');
  historyCard.classList.remove('hide');
});

// ✅ clickable history buttons
searchList.addEventListener("click", function (event) {
  if (event.target.matches(".city-btn")) {
    document.getElementById("city").value = event.target.textContent;
    fetchWeather();
  }
});

// ✅ load default city on page load
loadUserLocationAsDefault();
