var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({ extended: false} ));
app.set('view engine', 'handlebars');
app.set('port', 4900);
app.use(express.static(__dirname + '/views/public'));

//var weatherKey = "b65bd77d0451298f757069747d71a4de";
 
app.get('/', function(req, res, next) {
  var input = {};
  input.javascriptfile = "/js/intro.js";
  input.chartdata = "Blue";
  // Dummy data for main bootstrap file
  input.one = "Text";
  input.two = 0;
  input.three = 0;
  input.four = 0;
  res.render('intro', input);
});

app.get('/intro', function(req, res, next) {
  var input = {};
  input.javascriptfile = "/js/intro.js";
  input.chartdata = "Blue";
  // Dummy data for main bootstrap file
  input.one = "Text";
  input.two = 0;
  input.three = 0;
  input.four = 0;
  res.render('intro', input);
});

app.get('/basicsyntax', function(req, res, next) {
  var input = {};
  input.javascriptfile = "/js/basicsyntax.js";
  // Dummy data for main bootstrap file
  input.one = "Text";
  input.two = 0;
  input.three = 0;
  input.four = 0;
  res.render('basicsyntax', input);
});

app.get('/api', function(req, res, next) {
  var input = {};
  // Provide the javascript file to reference
  input.javascriptfile = "/js/api.js";
  request('http://finance.yahoo.com/webservice/v1/symbols/AAPL/quote?format=json&view=detail', function(err, response, body) {
    if(!err && response.statusCode < 400) {
      // Parse returned content
      var info = JSON.parse(body);
      
      // Parse out the fields that we want to variables
      // Number() and toFixed() used to create two decimal point number
      input.one = info.list.resources[0].resource.fields.name;
      var temp = info.list.resources[0].resource.fields.day_low;
      input.two = Number(temp).toFixed(2);
      temp = info.list.resources[0].resource.fields.price;
      input.three = Number(temp).toFixed(2);
      temp = info.list.resources[0].resource.fields.day_high;
      input.four = Number(temp).toFixed(2);

      // Render the page using the provided inputs
      res.render('api', input);
    } else {
      if(response) {
       console.log(response.statusCode);
      }
      next(err);
    }
  });
});

app.get('/interactive', function(req, res, next) {
  var input = {};
  input.javascriptfile = "/js/interactive.js";
  // Dummy data for main bootstrap file
  input.one = "Text";
  input.two = 0;
  input.three = 0;
  input.four = 0;
  res.render('interactive', input);
});

app.get('/interactiveapi', function(req, res, next) {
  var input = {};
  // Provide the javascript file to reference
  input.javascriptfile = "/js/interactiveapi.js";
  // Comma seperated stock tickers to retrieve multiple stock prices in one call
  request('http://finance.yahoo.com/webservice/v1/symbols/AAPL,GOOGL,AMZN/quote?format=json&view=detail', function(err, response, body) {
    if(!err && response.statusCode < 400) {
      // Parse returned content
      var info = JSON.parse(body);
      
      // Parse out the stock prices we want
      // Number() and toFixed() used to create two decimal point number
      // Note resources array number is changed to access multiple stocks
      input.one = "Text";
      var temp = info.list.resources[0].resource.fields.price;
      input.two = Number(temp).toFixed(2);
      temp = info.list.resources[1].resource.fields.price;
      input.three = Number(temp).toFixed(2);
      temp = info.list.resources[2].resource.fields.day_high;
      input.four = Number(temp).toFixed(2);

      // Render the page using the provided inputs
      res.render('interactiveapi', input);
    } else {
      if(response) {
       console.log(response.statusCode);
      }
      next(err);
    }
  });
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
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.')
});