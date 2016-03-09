// Basic chart preperation files
google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Function creates data, chart options, and draws chart
function drawChart() {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Line');
  data.addColumn('number', 'Percentage');
  data.addRows([
    ['Girl, you better have a license, cuz you are driving me crazy', 5],
    ['If beauty were measured in seconds, you would be an hour!', 7],
    ['Are you Sweadish? cuz you are the sweetish girl I have met!', 2],
  ]);

  // Set chart options
  var options = {title:'Pick Up Line Success Rate (%)',
                 width:800,
                 height:500,
                 bars: 'vertical'
                 legend: {position: 'top'},
                 colors: ['#990000', '#ff3333', '#ff9999']};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.BarChart(document.getElementById('pick-up'));
  chart.draw(data, options);
}