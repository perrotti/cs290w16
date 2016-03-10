google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(init);

// Wrapped code in init() function. Called by the Google Charts call back function
function init() {
  var data = new google.visualization.arrayToDataTable([
    ['Stock Name', 'Stock Price', { role: 'style' }],
    ['AAPL', dataTwo, 'silver']
  ]);

  /* Moved data, options, button, and chart decleration outside of drawChart, because drawChart will be called 
  multiple times. These variables should stay constant unless modified by our buttons */
  var options = {title:'Interactive Stock Prices',
                 width:450,   // Width of chart
                 height:450,  // Height of chart
                 // Necessary to create animations when changing values
                 animation: {
                    duration: 1000, // in ms
                    easing: 'out' // Start fast then slow down on animation
                 },
                 backgroundColor: {strokeWidth:3}};  // Put a border around the chart

  var chart = new google.visualization.ColumnChart(document.getElementById('interactiveapi_chart'));
  var appleButton = document.getElementById('aapl');
  var googleButton = document.getElementById('googl');
  var amazonButton = document.getElementById('amzn');

  function drawChart() {
    // Can't push buttons while chart draws
    appleButton.disable = true;
    googleButton.disable = true;
    amazonButton.disable = true;
    // Listen for the chart to finish loading, then enable buttons
    google.visualization.events.addListener(chart, 'ready', function() {
      appleButton.disable = false;
      googleButton.disable = false;
      amazonButton.disable = false;
    });
    chart.draw(data, options);
  }

  // Add listener that modifies chart value when Apple button clicked
  appleButton.onclick = function() {
    // Check to make sure stock price isn't already this company
    if (data.getValue(0, 0) != 'AAPL') {
      // Set new price, new title, and company color
      var newPrice = dataTwo;
      data.setValue(0, 1, newPrice);
      var newTitle = 'AAPL';
      data.setValue(0, 0, newTitle);
      data.setValue(0, 2, 'silver');
      drawChart();
    }
  }

  // Add listener that modifies chart value when Google button clicked
  googleButton.onclick = function() {
    // Check to make sure stock price isn't already this company
    if (data.getValue(0, 0) != 'GOOGL') {
      // Set new price, new title, and company color
      var newPrice = dataThree;
      data.setValue(0, 1, newPrice);
      var newTitle = 'GOOGL';
      data.setValue(0, 0, newTitle);
      data.setValue(0, 2, 'blue');
      drawChart();
    }
  }
  
  // Add listener that modifies chart value when Amazon button clicked
  amazonButton.onclick = function() {
    // Check to make sure stock price isn't already this company
    if (data.getValue(0, 0) != 'AMZN') {
      // Set new price, new title, and company color
      var newPrice = dataFour;
      data.setValue(0, 1, newPrice);
      var newTitle = 'AMZN';
      data.setValue(0, 0, newTitle);
      data.setValue(0, 2, 'orange');
      drawChart();
    }
  }

  // Initial call to drawChart() when page loads
  drawChart();
}






