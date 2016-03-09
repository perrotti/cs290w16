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
  var data = new google.visualization.arrayToDataTable(chartData);


  var options = {title:'Places I Have Eaten Lunch This Month',
                 width:450,   // Width of chart
                 height:300,  // Height of chart
                 backgroundColor: {strokeWidth:3}}  // Put a border around the chart

  var chart = new google.visualization.PieChart(document.getElementById('api_test_chart'));
  
  chart.draw(data, options);
}