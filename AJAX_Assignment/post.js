// Add an event listener that doesn't trigger until the entire HTML page is loaded
document.addEventListener('DOMContentLoaded', formSubmission);

function formSubmission() {
  // Creates a function that fires when the submit button is clicked
  document.getElementById('submit').addEventListener('click', function(event) { 
    // Assign the values from the forms to an object
    var payload = {stuff1:null, stuff2:null, stuff3:null};
    payload.stuff1 = document.getElementById("item1").value;
    payload.stuff2 = document.getElementById("item2").value;
    payload.stuff3 = document.getElementById("item3").value;

    // Generate the AJAX request
    var req = new XMLHttpRequest();
    req.open('POST', 'http://httpbin.org/post', true);
    req.setRequestHeader('Content-Type', 'application/json');
    // Create a load event for the AJAX request (asychronous)
    req.addEventListener('load', function() {
      // Check to make sure valid response is received
      if (req.status >= 200 && req.status < 400) {
        // Need to double parse to get down to the object stored in data (apparently) 
        var parsedOutput = JSON.parse(JSON.parse(req.responseText).data);
        
        // Post the results of the returned items
        document.getElementById("display1").textContent = "Item 1: " + parsedOutput["stuff1"];
        document.getElementById("display2").textContent = "Item 2: " + parsedOutput["stuff2"];
        document.getElementById("display3").textContent = "Item 3: " + parsedOutput["stuff3"];
      } else {
        // If a server error was received, post the response text to the log
        console.log("Error in network request: " + request.statusText);
      }
    });
    // Send the request and prevent default refresh
    req.send(JSON.stringify(payload));
    event.preventDefault();
  });
}