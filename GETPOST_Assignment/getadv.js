var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4700);

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

app.get('/get-adv', function(req, res) {
  var queryParams = [];
  for (var p in req.query) {
    queryParams.push({'name':p,'value':req.query[p]});
  }
  var displayItem = [];
  displayItem.dataList = queryParams;
  res.render('get-adv', displayItem);
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

