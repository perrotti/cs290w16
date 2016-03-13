function constructTable(input) {
  var table = document.createElement("table");
  table.id = "table";
  var headerRow = document.createElement("tr");
  var headerCell = document.createElement("th");
  headerCell.textContent = "Update/Delete";
  headerRow.appendChild(headerCell);
  headerCell = document.createElement("th");
  headerCell.textContent = "Workout Name";
  headerRow.appendChild(headerCell);
  headerCell = document.createElement("th");
  headerCell.textContent = "Reps";
  headerRow.appendChild(headerCell);
  headerCell = document.createElement("th");
  headerCell.textContent = "Weight";
  headerRow.appendChild(headerCell);
  headerCell = document.createElement("th");
  headerCell.textContent = "Date";
  headerRow.appendChild(headerCell);
  headerCell = document.createElement("th");
  headerCell.textContent = "Pounds?";
  headerRow.appendChild(headerCell);
  
  if (input[0] != null)  {
    var keys = Object.keys(input[0]);
    input.forEach(function(object) {
      var newRow = document.createElement("tr");
      var newCell = document.createElement("td");
      var updateButton = document.createElement("button");
      updateButton.id = "update" + object["id"];
      updateButton.type = "submit";
      updateButton.value = "update";
      var deleteButton = document.createElement("button");
      deleteButton.id = "delete" + object["id"];
      deleteButton.type = "submit";
      deleteButton.value = "delete";
      var idInput = document.createElement("input");
      idInput.id = "input" + object["id"];
      idInput.type = "hidden";
      idInput.value = object["id"];
      newCell.appendChild(updateButton);
      newCell.appendChild(deleteButton);
      newCell.appendChild(idInput);
      newRow.appendChild(newCell);

      keys.forEach(function(key) {
        if (key != "id") {
        newCell = document.createElement("td");
        newCell.textContent = object[key];
        newRow.appendChild(newCell);
      });
    });
  
  
  }
  return table;
}




// Add an event listener that doesn't trigger until the entire HTML page is loaded
document.addEventListener('DOMContentLoaded', formSubmission);

function formSubmission() {
  // Creates a function that fires when the submit button is clicked
  document.getElementById('submit').addEventListener('click', function(event) { 
    // Pull in the values from the forms
    var name = document.getElementById("name-input").value;
    var reps = document.getElementById("reps-input").value;
    var weight = document.getElementById("weight-code").value;
    var date = document.getElementById("date-input").value;
    var lbs = document.getElementById("lbs-input").value;
    var getString = "";
    var validInput = true;
    // Check to make sure the user provided accurate values (city && state get presedence)
    if (name != "") {
      getString = "/?" + "name=" + name + "&reps=" + reps + "&weight=" + weight + "&date=" + date + "&lbs=" + lbs;
    } else { 
      var validInput = false;
    }

    // Check to make sure valid input was received before sending the response
    if (validInput) {
      // Generate the AJAX request
      var req = new XMLHttpRequest();
      req.open("GET", url, true);
      // Create a load event for the AJAX request (asychronous)
      req.addEventListener('load', function() {
        // Check to make sure valid response is received
        if (req.status >= 200 && req.status < 400) {
          // Parse out the JSON information
          var newTableRows = JSON.parse(req.responseText);
          // Calculate the temperature
          var tableElem = document.getElementById("workout-table");
          for (var i = 0; i < newTableRows.length; i++) {
            var tableRow = document.createElement("tr");
            var updateButton = document.createElement("button");
            updateButton.id = "update" + newTableRows[0].id;
            updateButton.type = "submit";
            updateButton.value = "update";
            var deleteButton = document.createElement("button");
            deleteButton.id = "delete" + newTableRows[0].id;
            deleteButton.type = "submit";
            deleteButton.value = "delete";
            var idRow = document.createElement("button");
            
            
            
            var tempP = document.createElement("p");
          
          
          
          }var tempF = (1.8 * (weather.main.temp - 273)) + 32;
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