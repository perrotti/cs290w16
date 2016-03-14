var key = "b65bd77d0451298f757069747d71a4dea"; // User can input their openweathermap API key here

// This section of the javascript creates the output elements (<p>) for the results of city, temp, and humidity
var outputDiv = document.getElementById("output-div");
var pNames = ["city", "temp", "humidity"];
var pText = ["City: ", "Temperate (F): ", "Humidity: "];
for (var i = 0; i < 3; i++) {
  var tempP = document.createElement("p");
  tempP.id = pNames[i];
  tempP.textContent = pText[i];
  outputDiv.appendChild(tempP);
}

// Add an event listener that doesn't trigger until the entire HTML page is loaded
document.addEventListener('DOMContentLoaded', formSubmission);

function formSubmission() {
  // Creates a function that fires when the submit button is clicked
  document.getElementById('submit').addEventListener('click', function(event) { 
    // Pull in the values from the forms
    var city = document.getElementById("city-input").value;
    var state = document.getElementById("state-input").value;
    var zip = document.getElementById("zip-code").value;
    var url = "http://api.openweathermap.org/data/2.5/weather?";
    // Check to make sure the user provided accurate values (city && state get presedence)
    if (city != "" && state != "") {
      url = url + "q=" + city + "," + state + "&appid=" + key;
    } else if (zip != "") {
      url = url + "zip=" + zip + "," + "us" + "&appid=" + key;
    } else {
      url = "DO NOT SEND";
    }

    // Check to make sure valid input was received before sending the response
    if (url != "DO NOT SEND") {
      // Generate the AJAX request
      var req = new XMLHttpRequest();
      req.open("GET", url, true);
      // Create a load event for the AJAX request (asychronous)
      req.addEventListener('load', function() {
        // Check to make sure valid response is received
        if (req.status >= 200 && req.status < 400) {
          // Parse out the JSON information
          var weather = JSON.parse(req.responseText);
          // Calculate the temperature
          var tempF = (1.8 * (weather.main.temp - 273)) + 32;
          tempF = tempF.toFixed(2);
          // Post the results of city, temp, and humidity
          document.getElementById("city").textContent = pText[0] + weather.name;
          document.getElementById("temp").textContent = pText[1] + tempF;
          document.getElementById("humidity").textContent = pText[2] + weather.main.humidity + "%";
        } else {
          // If a server error was received, post the response text to the log
          console.log("Error in network request: " + request.statusText);
        }
      });
      // Send the request and prevent default refresh
      req.send(null);
      event.preventDefault();
    } else {
      // If invalid data was received, post error message to log and outputs, and ensure form doesn't refresh page
      console.log("Invalid input");
      // Set error code to result field to alert the user input was invalid
      document.getElementById("city").textContent = pText[0] + "Invalid Input";
      document.getElementById("temp").textContent = pText[1] + "Invalid Input";
      document.getElementById("humidity").textContent = pText[2] + "Invalid Input";
      // Prevent refresh
      event.preventDefault();
    }
  });
}