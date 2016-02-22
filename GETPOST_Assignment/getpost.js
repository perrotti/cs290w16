// Boiler plate code from the lectures
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

// More boiler plate...
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set the port to 5000
app.set('port', 5000);

// Home page still generates so you can see something
app.get('/', function(req, res) {
  res.render('home');
});

// This handles the get request
app.get('/get-post', function(req, res) {
  var queryParams = [];
  // Loop through all of the items in the URL query section
  for (var p in req.query) {
    queryParams.push({'name':p,'value':req.query[p]});
  }
  // Create a variable to store the values
  var displayItem = {};
  // Check to see if data was not provided 
  if (queryParams == null) {
    displayItem.noData = true;
  } else {
    displayItem.getReq = true;
  }
  displayItem.dataList = queryParams;
  // Render the get-post handlebars page
  res.render('get-post', displayItem);
});

// This handles the post request
app.post('/get-post', function(req, res) {
  var queryParams = [];
  // Loop through all the values in the request body 
  for (var p in req.body) {
    queryParams.push({'name':p,'value':req.body[p]});
  }
  // Create a variable to store the values
  var displayItem = {};
  // Check to see if the data was not provided
  if (queryParams == null) {
    displayItem.noData = true;
  } else {
    displayItem.postReq = true;
  }
  displayItem.dataList = queryParams;
  // Render the get-post handlebars page
  res.render('get-post', displayItem);
});

// Standard page not found error
app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

// Server issue error
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

// Start server listening... and post to console to let us know it is running
app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

