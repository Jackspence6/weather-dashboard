/******************************************/
/* External dependencies */
/******************************************/
var dateDisplayEl = document.getElementById("current-date");
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
