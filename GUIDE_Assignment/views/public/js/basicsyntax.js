/* Basic chart preperation files that must be included. 
For different chart types additional packages must be added.
For older versions of Google Chart releases, 'current' must be changed */
google.charts.load('current', {packages: ['corechart']});

/* This defines the "call back" function once the page loads
Change drawChart to the function you create */
google.charts.setOnLoadCallback(drawChart);

/* This controls all of the main functionality of the chart. 
You will organize your data, select your chart options, and draw 
the chart using this function */
function drawChart() {

  // Create the data you want to include in your chart
  var data = new google.visualization.arrayToDataTable([
    ['Restaurant', 'Count'],
    ['Tutta Bella', 1],
    ['Sushi Mio', 3],
    ['Chipotle', 7],
    ['Thai Truck', 5],
    ['Jimmy Johns', 2],
    ['Chic-fil-a', 11]
  ]);

  // Set options for how the chart will be displayed
  var options = {title:'Places I Have Eaten Lunch This Month',
                 width:500,   // Width of chart
                 height:500,  // Height of chart
                 backgroundColor: {strokeWidth:3}}  // Put a border around the chart

  /* This line does several things:
  1) Creates a Google Chart and assigns it to a variable
  2) Designates the chart type (PieChart in this case)
  3) Indicates which HTML element will display the chart (food_chart in this case) */
  var chart = new google.visualization.PieChart(document.getElementById('food_chart'));
  
  // This line draws the chart using the data and options designated above
  chart.draw(data, options);
}