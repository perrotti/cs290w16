var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(session({secret: 'SuperSecretePassword'}));
app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({ extended: false} ));
app.set('view engine', 'handlebars');
app.set('port', 4920);

var key = "b65bd77d0451298f757069747d71a4de";

/*request('http://www.google.com', function(error, response, body) {
  if(!error && response.statusCode == 200) {
    console.log(body);
  }
})*/

app.get('/get-ex', function(req, res, next){
  var input = {};
  request('http://api.openweathermap.org/data/2.5/weather?q=seattle&APPID=' + key, function(err, response, body) {
    if(!err && response.statusCode < 400) {
      var info = JSON.parse(body);
      input.owm = info.main.temp;
      res.render('weather-test', input);
    } else {
      if(response) {
       console.log(response.statusCode);
      }
      next(err);
    }
  });
});
 
app.get('/m', function(req, res, next) {
  var input = {};
  request('http://api.openweathermap.org/data/2.5/weather?q=seattle&APPID=' + key, function(err, response, body) {
    if(!err && response.statusCode < 400) {
      var info = JSON.parse(body);
      console.log("request 1 worked");
      input.owm = info.main.temp;
      request('http://api.openweathermap.org/data/2.5/weather?q=vancouver&APPID=' + key, function(err, response, body){
        if(!err && response.statuCode < 400) {
          var info2 = JSON.parse(body);
          console.log("request 2 worked");
          input.httpbin = info2;
          res.render('weather-test', input);
        }else{
          console.log("request 2 failed");
          console.log(err);
          if(response){
            console.log(response.statusCode);
          }
          next(err);
        }
      });
    } else {
      console.log(err);
      if(response){
       console.log(response.statusCode);
      }
      next(err);
    }
  });
});

 

app.get('/', function(req, res, next) {
  var input = {};
  if(!req.session.name) {
    res.render('newSession', input);
    return;
  }
  input.name = req.session.name;
  input.toDoCount = req.session.toDo.length || 0;
  input.toDo = req.session.toDo || [];
  console.log(input.toDo);
  res.render('toDo', input);
});

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

