var url = "http://52.24.188.242:4999";

function clearTable() {
  var tbody = document.getElementById("tbody");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}

function linkUpdateButton(button, id) {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    var variable = "id=" + id;
    window.location.href = "../update?" + variable;
  });
}

function linkDeleteButton(button, id) {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    var variable = "id=" + id;
    var requestString = url + "/delete?" + variable;
    var req = new XMLHttpRequest();
    req.open("GET", requestString, true);
    // Create a load event for the AJAX request (asychronous)
    req.addEventListener('load', function() {
      // Check to make sure valid response is received
      if (req.status >= 200 && req.status < 400) {
        // Parse out the JSON information
        var infoReceived = JSON.parse(req.responseText);
        document.getElementById("status").textContent = "Deleted row with ID = " + id;
        constructTable(infoReceived);
      } else {
        // If a server error was received, post the response text to the log
        document.getElementById("status").textContent = "Error while trying to delete row";
        console.log("Error in network request: " + request.statusText);
      }
    });
    // Send the request and prevent default refresh
    req.send(null);
  });
}

function constructTable(input) {
  clearTable();
  var tbody = document.getElementById("tbody");
  if (input[0] != null)  {
    var keys = Object.keys(input[0]);
    input.forEach(function(object) {
      // Create a new row
      var newRow = document.createElement("tr");
      // Add an update button
      var newCell = document.createElement("td");
      var updateButton = document.createElement("button");
      updateButton.id = "update-" + object["id"];
      updateButton.type = "submit";
      updateButton.value = "update";
      updateButton.textContent = "update";
      linkUpdateButton(updateButton, object["id"]);
      newCell.appendChild(updateButton);
      newRow.appendChild(newCell);
      
      // Add a delete button
      newCell = document.createElement("td");
      var deleteButton = document.createElement("button");
      deleteButton.id = "delete-" + object["id"];
      deleteButton.type = "submit";
      deleteButton.value = "delete";
      deleteButton.textContent = "delete";
      linkDeleteButton(deleteButton, object["id"]);
      newCell.appendChild(deleteButton);
      newRow.appendChild(newCell);
      
      // Add the values for each field from SQL query
      keys.forEach(function(key) {
        if (key != "id") {
          if(key == "date") {
            newCell = document.createElement("td");
            var tempString = object[key];
            newCell.textContent = tempString.substring(0,10);
            newRow.appendChild(newCell);
          } else {
            newCell = document.createElement("td");
            newCell.textContent = object[key];
            newRow.appendChild(newCell);
          }
        }
      });
      tbody.appendChild(newRow);
    });
  }
  return tbody;
}

function requestTable() {
  var req = new XMLHttpRequest();
  var requestString = url + "/select";
  req.open("GET", requestString, true);
  // Create a load event for the AJAX request (asychronous)
  req.addEventListener('load', function() {
    // Check to make sure valid response is received
    if (req.status >= 200 && req.status < 400) {
      // Parse out the JSON information
      var infoReceived = JSON.parse(req.responseText);
      constructTable(infoReceived);
    } else {
      // If a server error was received, post the response text to the log
      console.log("Error in network request: " + request.statusText);
    }
  });
  // Send the request and prevent default refresh
  req.send(null);
}

// Add an event listener that doesn't trigger until the entire HTML page is loaded
document.addEventListener('DOMContentLoaded', formSubmission);

function formSubmission() {
  // Creates a function that fires when the submit button is clicked
  document.getElementById('submit').addEventListener('click', function(event) { 
    // Pull in the values from the forms
    var name = document.getElementById("name-input").value;
    var reps = document.getElementById("reps-input").value;
    var weight = document.getElementById("weight-input").value;
    var date = document.getElementById("date-input").value;
    var lbs = document.getElementById("lbs-input").value;
    var getString = "";
    var validInput = true;
    // Check to make sure the user provided accurate values (city && state get presedence)
    if (name != "") {
      getString = "/insert?" + "name=" + name + "&reps=" + reps + "&weight=" + weight + "&date=" + date + "&lbs=" + lbs;
    } else { 
      var validInput = false;
    }

    // Check to make sure valid input was received before sending the response
    if (validInput) {
      // Generate the AJAX request
      var req = new XMLHttpRequest();
      var requestString = url + getString;
      req.open("GET", requestString, true);
      // Create a load event for the AJAX request (asychronous)
      req.addEventListener('load', function() {
        // Check to make sure valid response is received
        if (req.status >= 200 && req.status < 400) {
          // Server sends back ID that was created, alert user that new ID was accepted
          var insertInfo = JSON.parse(req.responseText);
          document.getElementById("status").textContent = "Added new workout row with ID = " + insertInfo.insertId;
          // Clear the form
          document.forms['main-form'].reset();
          // Refresh the table
          requestTable();
        } else {
          // If a server error was received, post the response text to the log
          console.log("Error in network request: " + req.statusText);
          document.getElementById("status").textContent = "Your submission is invalid. Change fields and try again";
        }
      });
      // Send the request and prevent default refresh
      req.send(null);
      event.preventDefault();
    } else {
      // If invalid data was received, post error message to the console
      console.log("Invalid input");
      // Set error code to status field in HTML
      document.getElementById("status").textContent = "Invalid input provided. Please ensure workout has a name";
      // Prevent refresh
      event.preventDefault();
    }
  });
}

// Initial loading of table when the page is first called
requestTable();