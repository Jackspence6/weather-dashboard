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
// External Weather elements for Day 1 forecast
var day1TempEl = document.getElementById("day1-temp");
var day1WindEl = document.getElementById("day1-wind");
var day1HumidityEl = document.getElementById("day1-humidity");
var day1WeatherConditionsEl = document.getElementById("day1-weatherconditions");
// External Weather elements for Day 2 forecast
var day2TempEl = document.getElementById("day2-temp");
var day2WindEl = document.getElementById("day2-wind");
var day2HumidityEl = document.getElementById("day2-humidity");
var day2WeatherConditionsEl = document.getElementById("day2-weatherconditions");
// External Weather elements for Day 3 forecast
var day3TempEl = document.getElementById("day3-temp");
var day3WindEl = document.getElementById("day3-wind");
var day3HumidityEl = document.getElementById("day3-humidity");
var day3WeatherConditionsEl = document.getElementById("day3-weatherconditions");
// External Weather elements for Day 4 forecast
var day4TempEl = document.getElementById("day4-temp");
var day4WindEl = document.getElementById("day4-wind");
var day4HumidityEl = document.getElementById("day4-humidity");
var day4WeatherConditionsEl = document.getElementById("day4-weatherconditions");
// External Weather elements for Day 5 forecast
var day5TempEl = document.getElementById("day5-temp");
var day5WindEl = document.getElementById("day5-wind");
var day5HumidityEl = document.getElementById("day5-humidity");
var day5WeatherConditionsEl = document.getElementById("day5-weatherconditions");
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

// Api Key Variable
var apiKey;

// Daily Weather forecast data variables
var forecast;
var filteredArray;

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
  // Day1 date
  var day1 = moment().format("Do MMMM YYYY");
  console.log(day1);
  // Day2 date
  var day2 = moment().add(1, "days").format("Do MMMM YYYY");
  console.log(day2);
  // Day3 date
  var day3 = moment().add(2, "days").format("Do MMMM YYYY");
  console.log(day3);
  // Day4 date
  var day4 = moment().add(3, "days").format("Do MMMM YYYY");
  console.log(day4);
  // Day5 date
  var day5 = moment().add(4, "days").format("Do MMMM YYYY");
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

      //   Calling functions once getLatLon function has retrieved data
      getWeatherData();
      cardDateDisplay();
      resetSearchBar();
      getForecastApi();
    });
}

// function to get live weather data
function getWeatherData() {
  apiKey = "049be9d108315522a49e73bb36ea79dc";
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

// function to get five-day weather forecast
function getForecastApi() {
  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      forecast = data.list;
      console.log(forecast);
      var searchText = "12:00:00";

      // Loop over the data to find all data that is for "12:00:00"
      for (let i = 0; i < forecast.length; i++) {
        filteredArray = extractElementsContainingText(forecast, searchText);
        console.log(filteredArray);
      }
      forecastDisplay();
    });
}

// Function to extract weather data only for "12:00:00" each day
function extractElementsContainingText(array, searchText) {
  filteredArray = array.filter(function (element) {
    for (var key in element) {
      if (
        element.hasOwnProperty(key) &&
        String(element[key]).includes(searchText)
      ) {
        return true;
      }
    }
    return false;
  });

  return filteredArray;
}

// Function to extract and display forecast weather to document
function forecastDisplay() {
  console.log(filteredArray);
  // Extract specific weather data for day 1
  var day1Temp = filteredArray[0].main.temp;
  console.log(day1Temp);
  var day1Wind = filteredArray[0].wind.speed;
  console.log(day1Wind);
  var day1Humidity = filteredArray[0].main.humidity;
  console.log(day1Humidity);
  var day1WeatherConditions = filteredArray[0].weather[0].main;
  console.log(day1WeatherConditions);
  // Display specific weather data for day 1
  day1TempEl.textContent = day1Temp + " °C";
  day1WindEl.textContent = day1Wind + " km/h";
  day1HumidityEl.textContent = day1Humidity + " %";
  day1WeatherConditionsEl.textContent = day1WeatherConditions;
  // Extract specific weather data for day 2
  var day2Temp = filteredArray[1].main.temp;
  console.log(day2Temp);
  var day2Wind = filteredArray[1].wind.speed;
  console.log(day2Wind);
  var day2Humidity = filteredArray[1].main.humidity;
  console.log(day2Humidity);
  var day2WeatherConditions = filteredArray[1].weather[0].main;
  console.log(day2WeatherConditions);
  // Display specific weather data for day 2
  day2TempEl.textContent = day2Temp + " °C";
  day2WindEl.textContent = day2Wind + " km/h";
  day2HumidityEl.textContent = day2Humidity + " %";
  day2WeatherConditionsEl.textContent = day2WeatherConditions;
  // Extract specific weather data for day 3
  var day3Temp = filteredArray[2].main.temp;
  console.log(day3Temp);
  var day3Wind = filteredArray[2].wind.speed;
  console.log(day3Wind);
  var day3Humidity = filteredArray[2].main.humidity;
  console.log(day3Humidity);
  var day3WeatherConditions = filteredArray[2].weather[0].main;
  console.log(day3WeatherConditions);
  // Display specific weather data for day 3
  day3TempEl.textContent = day3Temp + " °C";
  day3WindEl.textContent = day3Wind + " km/h";
  day3HumidityEl.textContent = day3Humidity + " %";
  day3WeatherConditionsEl.textContent = day3WeatherConditions;
  // Extract specific weather data for day 4
  var day4Temp = filteredArray[3].main.temp;
  console.log(day4Temp);
  var day4Wind = filteredArray[3].wind.speed;
  console.log(day4Wind);
  var day4Humidity = filteredArray[3].main.humidity;
  console.log(day4Humidity);
  var day4WeatherConditions = filteredArray[3].weather[0].main;
  console.log(day4WeatherConditions);
  // Display specific weather data for day 4
  day4TempEl.textContent = day4Temp + " °C";
  day4WindEl.textContent = day4Wind + " km/h";
  day4HumidityEl.textContent = day4Humidity + " %";
  day4WeatherConditionsEl.textContent = day4WeatherConditions;
  // Extract specific weather data for day 5
  var day5Temp = filteredArray[4].main.temp;
  console.log(day5Temp);
  var day5Wind = filteredArray[4].wind.speed;
  console.log(day5Wind);
  var day5Humidity = filteredArray[4].main.humidity;
  console.log(day5Humidity);
  var day5WeatherConditions = filteredArray[4].weather[0].main;
  console.log(day5WeatherConditions);
  // Display specific weather data for day 5
  day5TempEl.textContent = day5Temp + " °C";
  day5WindEl.textContent = day5Wind + " km/h";
  day5HumidityEl.textContent = day5Humidity + " %";
  day5WeatherConditionsEl.textContent = day5WeatherConditions;
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
