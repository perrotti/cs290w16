google.charts.load('current', {packages: ['corechart']});

google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  // Create the data you want to include in your chart
  var data = new google.visualization.arrayToDataTable([
    [dataOne, 'Price'],
    ['Low', dataTwo],
    ['Current Price', dataThree],
    ['High', dataFour]
  ]);

  var options = {title:dataOne + 'Places Stock Price',
                 width:450,   // Width of chart
                 height:450,  // Height of chart
                 backgroundColor: {strokeWidth:3}}  // Put a border around the chart

  var chart = new google.visualization.BarChart(document.getElementById('api_test_chart'));
  
  chart.draw(data, options);
}