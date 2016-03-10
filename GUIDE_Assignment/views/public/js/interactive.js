google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

/* Moved data, options, button, and chart decleration outside of drawChart, because drawChart will be called 
multiple times. These variables should stay constant unless modified by our buttons */
var data = new google.visualization.arrayToDataTable([
  ['Candy', 'Price'],
  ['Price Low', 250]
]);

var options = {title:'Skittles I Want to Eat',
               width:450,   // Width of chart
               height:450,  // Height of chart
               // Necessary to create animations when changing values
               animation: {
                  duration: 1000, // in ms
                  easing: 'out' // Start fast then slow down on animation
               },
               vAxis: {minValue: 0, maxValue:500}, // Fix the vertical axis range
               backgroundColor: {strokeWidth:3}};  // Put a border around the chart

var chart = new google.visualization.ColumnChart(document.getElementById('interactive_chart'));
var upButton = document.getElementById('button_up');
var downButton = document.getElementById('button_down');

function drawChart() {
  // Can't push buttons while chart draws
  upButton.disable = true;
  downButton.disable = true;
  // Listen for the chart to finish loading, then enable buttons
  google.visualization.events.addListener(chart, 'ready', function() {
    upButton.disable = false;
    downButton.disable = false;
  });
  chart.draw(data, options);
}

// Add listener that modifies chart value when up button clicked
upButton.onclick = function() {
  if (data.getValue(0, 1) < 500) {
    var newCount = data.getValue(0, 1) + 50;
    data.setValue(0, 1, newCount);
    drawChart();
  }
}

// Add listener that modifies chart values when down button clicked
downButton.onclick = function() {
  if (data.getValue(0, 1) > 0) {
    var newCount = data.getValue(0, 1) - 50;
    data.setValue(0, 1, newCount);
    drawChart();
  }
}

// Initial call to drawChart() when page loads
drawChart();







