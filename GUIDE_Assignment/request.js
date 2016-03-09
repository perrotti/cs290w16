var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({ extended: false} ));
app.set('view engine', 'handlebars');
app.set('port', 4950);
app.use(express.static(__dirname + '/views/public'));

var weatherKey = "b65bd77d0451298f757069747d71a4de";
 
app.get('/', function(req, res, next) {
  var input = {};
  input.javascriptfile = "/js/intro.js";
  res.render('intro', input);
});

app.get('/intro', function(req, res, next) {
  var input = {};
  input.javascriptfile = "/js/intro.js";
  res.render('intro', input);
});
/*
app.post('/', function(req, res) {
  var input = {};

  if(req.body['New List']) {
    console.log("inside new list");
    req.session.name = req.body.name;
    req.session.toDo = [];
    req.session.curId = 0;
  }
  
  if(!req.session.name) {
    console.log("inside no session name");
    res.render('newSession', input);
    return;
  }

  if(req.body['Add']) {
    console.log("inside add item");
    req.session.toDo.push({"name":req.body.name, "id":req.session.curId});
    req.session.curId++;
  }

  if(req.body['Done']) {
    console.log("inside done");
    req.session.toDo = req.session.toDo.filter(function(e){
      return e.id != req.body.id;
    })
  }

  console.log("Finally rendering");
  input.name = req.session.name;
  input.toDoCount = req.session.toDo.length;
  input.toDo = req.session.toDo;
  console.log(input.toDo);
  res.render('toDo', input);
});
*/
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
