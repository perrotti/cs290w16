var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({ extended: false} ));
app.set('view engine', 'handlebars');
app.set('port', 4970);
app.use(express.static(__dirname + '/views/public'));

//var weatherKey = "b65bd77d0451298f757069747d71a4de";
 
app.get('/', function(req, res, next) {
  var input = {};
  input.javascriptfile = "/js/intro.js";
  input.chartdata = "Blue";
  res.render('intro', input);
});

app.get('/intro', function(req, res, next) {
  var input = {};
  input.javascriptfile = "/js/intro.js";
  input.chartdata = "Blue";
  res.render('intro', input);
});

app.get('/basicsyntax', function(req, res, next) {
  var input = {};
  input.javascriptfile = "/js/basicsyntax.js";
  res.render('basicsyntax', input);
});

app.get('/apitest', function(req, res, next) {
  var input = {};
  request('http://finance.yahoo.com/webservice/v1/symbols/AAPL/quote?format=json&view=detail', function(err, response, body) {
    if(!err && response.statusCode < 400) {
      var info = JSON.parse(body);
      input.one = info;
      input.two = info.list;
      input.three = info.list.resources;
      input.four = info.list.resources[0].resource;
      input.five = info.list.resources[0].resource.fields.name;
      input.six = info.list.resources[0].resource.fields.year_low;
      input.six = input.six.toFixed(2);
      input.seven = info.list.resources[0].resource.fields.day_low;
      input.seven = input.seven.toFixed(2);
      input.eight = info.list.resources[0].resource.fields.price;
      input.eight = input.eight.toFixed(2);
      input.nine = info.list.resources[0].resource.fields.day_high;
      input.nine = input.nine.toFixed(2);
      input.ten = info.list.resources[0].resource.fields.year_high;
      input.ten = input.ten.toFixed(2);
      res.render('apitest', input);
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
