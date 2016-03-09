// Basic chart preperation files
google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Function creates data, chart options, and draws chart
function drawChart() {

  // Create the data table.
  var data = new google.visualization.arrayToDataTable([
    ['Line', 'Percentage', {role: 'style'}],
    ['Girl, you better have a license, cuz you are driving me crazy', 5, '#990000'],
    ['If beauty were measured in seconds, you would be an hour!', 7, '#ff3333'],
    ['Are you Sweadish? cuz you are the sweetish girl I have met!', 2, '#ff9999']
  ]);

  // Set chart options
  var options = {title:'Pick Up Line Success Rate (%)',
                 width:800,
                 height:500,
                 backgroundColor.strokeWidth:3,
                 cssClassNames: {headerCell: 'googleHeaderCell'}};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.ColumnChart(document.getElementById('pick-up'));
  chart.draw(data, options);
}