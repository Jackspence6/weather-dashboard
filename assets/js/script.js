/******************************************/
/* External dependencies */
/******************************************/
// External City Name Elements
var cityNameEl = document.getElementById("city-name");
// External Date elements
var dateDisplayEl = document.getElementById("current-date");
var todayDateEl = document.getElementById("today");
var day1DateEl = document.getElementById("day1");
var day2DateEl = document.getElementById("day2");
var day3DateEl = document.getElementById("day3");
var day4DateEl = document.getElementById("day4");
var day5DateEl = document.getElementById("day5");
// External search elements
var searchBarEl = document.getElementById("search-bar");
var searchBtnEl = document.getElementById("search-btn");
// External weather elements for today
var todayTempEl = document.getElementById("today-temp");
var todayWindEl = document.getElementById("today-wind");
var todayHumidityEl = document.getElementById("today-humidity");
var todayWeatherConditionsEl = document.getElementById(
  "today-weatherconditions"
);
/******************************************/
/* Global variables and constants */
/******************************************/
// Location variables
var latitude;
var longitude;

// Todays Weather variables
var todayTemp;
var todayWind;
var todayHumidity;
var todayWeatherConditions;

// City Variables
var city;

/******************************************/
/* Function and class declarations */
/******************************************/
// Function to display the current date onto the document
function dateDisplay() {
  var rightNow = moment().format("dddd, MMMM Do YYYY");
  console.log(rightNow);
  dateDisplayEl.textContent = rightNow;
}

// function to display dates to cards when location is chosen
function cardDateDisplay(Event) {
  // Todays date
  var today = moment().format("Do MMMM YYYY");
  console.log(today);
  // Tomorrow's date
  var day1 = moment().add(1, "days").format("Do MMMM YYYY");
  console.log(day1);
  // One day after tomorrows date
  var day2 = moment().add(2, "days").format("Do MMMM YYYY");
  console.log(day2);
  // Two days after tomorrows date
  var day3 = moment().add(3, "days").format("Do MMMM YYYY");
  console.log(day3);
  // Three days after tomorrows date
  var day4 = moment().add(4, "days").format("Do MMMM YYYY");
  console.log(day4);
  // Four days after tomorrows date
  var day5 = moment().add(5, "days").format("Do MMMM YYYY");
  console.log(day5);

  //   Display these dates on the document
  todayDateEl.textContent = "(" + today + ")";
  day1DateEl.textContent = day1;
  day2DateEl.textContent = day2;
  day3DateEl.textContent = day3;
  day4DateEl.textContent = day4;
  day5DateEl.textContent = day5;
}

// function to city Latitude & Longitude
function getLatLon() {
  city = searchBarEl.value;
  var apiKey = "049be9d108315522a49e73bb36ea79dc";
  var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      latitude = data[0].lat;
      longitude = data[0].lon;
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);

      //   Calling getWeatherData function once getLatLon function has retrieved data
      getWeatherData();
      cardDateDisplay();
      resetSearchBar();
    });
}

// function to get live weather data
function getWeatherData() {
  var apiKey = "049be9d108315522a49e73bb36ea79dc";
  var newRequestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(newRequestUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      todayTemp = data.main.temp;
      console.log(todayTemp);
      todayWind = data.wind.speed;
      console.log(todayWind);
      todayHumidity = data.main.humidity;
      console.log(todayHumidity);
      todayWeatherConditions = data.weather[0].main;
      console.log(todayWeatherConditions);

      //   Calling the displayWeatherData function to add the data to the document
      displayWeatherData();
    });
}

// function to display weather data to document
function displayWeatherData() {
  todayTempEl.textContent = todayTemp + " °C";
  todayWindEl.textContent = todayWind + " km/h";
  todayHumidityEl.textContent = todayHumidity + " %";
  todayWeatherConditionsEl.textContent = todayWeatherConditions;
  cityNameEl.textContent = city;
}

// Function to reset the search bar
function resetSearchBar() {
  searchBarEl.value = "";
}

/******************************************/
/* Event listeners */
/******************************************/
searchBtnEl.addEventListener("click", getLatLon);
/******************************************/
/* Document manipulation */
/******************************************/

/******************************************/
/* Initialization code */
/******************************************/
// setInterval to update the date every second
setInterval(dateDisplay, 1000);
/******************************************/
/* Main logic */
/******************************************/
