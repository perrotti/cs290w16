var url = "http://52.24.188.242:4999";

// Add an event listener that doesn't trigger until the entire HTML page is loaded
document.addEventListener('DOMContentLoaded', formSubmission);

function formSubmission() {
  // Creates a function that fires when the submit button is clicked
  document.getElementById('update').addEventListener('click', function(event) { 
    // Pull in the values from the forms
    var id = document.getElementById("key-id").value;
    var name = document.getElementById("name-input").value;
    var reps = document.getElementById("reps-input").value;
    var weight = document.getElementById("weight-input").value;
    var date = document.getElementById("date-input").value;
    var lbs = document.getElementById("lbs-input").value;
    var getString = "";
    var validInput = true;
    // Check to make sure the user provided accurate values (city && state get presedence)
    if (name != "") {
      getString = "/update_submit?" "id=" + id + "&name=" + name + "&reps=" + reps + "&weight=" + weight + "&date=" + date + "&lbs=" + lbs;
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
      document.getElementById("status").textContent = "Invalid input provided. Please ensure workout has a name.";
      // Prevent refresh
      event.preventDefault();
    }
  });
}