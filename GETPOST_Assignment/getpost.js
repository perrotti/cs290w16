var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5000);

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/beach', function(req, res) {
  res.render('beach');  
});

function genNum() {
  var displayItem = {};
  displayItem.randomNumber = Math.floor((Math.random() * 10)) + 1;
  return displayItem;
}

function genTime() {
  var displayItem = {};
  displayItem.time = (new Date(Date.now())).toLocaleTimeString('en-US');
  return displayItem;
}


app.get('/number', function(req, res) {
  res.render('number', genNum());
});

app.get('/time', function(req, res) {
  res.render('time', genTime());
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
  displayItem.getReq = true;
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
  // Lets us know this is a POST request in handlebars
  displayItem.getReq = false;
  displayItem.dataList = queryParams;
  // Render the get-post handlebars page
  res.render('get-post', displayItem);
});

app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

