/******************************************/
/* External dependencies */
/******************************************/
var dateDisplayEl = document.getElementById("current-date");
var todayDateEl = document.getElementById("today");
var day1DateEl = document.getElementById("day1");
var day2DateEl = document.getElementById("day2");
var day3DateEl = document.getElementById("day3");
var day4DateEl = document.getElementById("day4");
var day5DateEl = document.getElementById("day5");
/******************************************/
/* Global variables and constants */
/******************************************/

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
  todayDateEl.textContent = today;
  day1DateEl.textContent = day1;
  day2DateEl.textContent = day2;
  day3DateEl.textContent = day3;
  day4DateEl.textContent = day4;
  day5DateEl.textContent = day5;
}
/******************************************/
/* Event listeners */
/******************************************/

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
