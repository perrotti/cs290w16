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
  input.javascriptfile = "/js/apitest.js";
  request('http://finance.yahoo.com/webservice/v1/symbols/AAPL/quote?format=json&view=detail', function(err, response, body) {
    if(!err && response.statusCode < 400) {
      // Parse returned content
      var info = JSON.parse(body);
      
      // Parse out the fields that we want to variables
      input.one = info.list.resources[0].resource.fields.name;
      
      var temp = info.list.resources[0].resource.fields.year_low;
      input.two = Number(temp).toFixed(2);
      
      temp = info.list.resources[0].resource.fields.day_low;
      input.three = Number(temp).toFixed(2);
      
      temp = info.list.resources[0].resource.fields.price;
      input.four = Number(temp).toFixed(2);
      
      temp = info.list.resources[0].resource.fields.day_high;
      input.five = Number(temp).toFixed(2);
      
      temp = info.list.resources[0].resource.fields.year_high;
      input.six = Number(temp).toFixed(2);
      
      // Format all of the variables into the style that Google Charts needs
      input.chartdata = [];
      var arr = [input.one, 'Stock Price'];
      input.chartdata.push(arr);
      arr = ['Year Low', input.two];
      input.chartdata.push(arr);
      arr = ['Day Low', input.three];
      input.chartdata.push(arr);
      arr = ['Price', input.four];
      input.chartdata.push(arr);
      arr = ['Day Hight', input.five];
      input.chartdata.push(arr);
      arr = ['Year High', input.six];
      input.chartdata.push(arr);
      
      input.seven = input.chartdata;
      
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


/*Code to parse YAHOO API INFORMATION
Saved for reference

var info = JSON.parse(body);
input.one = info;
input.two = info.list;
input.three = info.list.resources;
input.four = info.list.resources[0].resource;
input.five = info.list.resources[0].resource.fields.name;
var temp = info.list.resources[0].resource.fields.year_low;
input.six = Number(temp).toFixed(2);
temp = info.list.resources[0].resource.fields.day_low;
input.seven = Number(temp).toFixed(2);
input.eight = info.list.resources[0].resource.fields.price;
input.nine = info.list.resources[0].resource.fields.day_high;
input.ten = info.list.resources[0].resource.fields.year_high;*/