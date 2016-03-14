var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'localhost',
  user  : 'student',
  password: 'default',
  database: 'student'
});

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({ extended: false} ));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.set('view engine', 'handlebars');
app.set('port', 4999);
app.use(express.static(__dirname + '/views/public'));

// Create the table when the server starts
var initialTable = "CREATE TABLE IF NOT EXISTS workout("+
  "id INT PRIMARY KEY AUTO_INCREMENT,"+
  "name VARCHAR(255) NOT NULL,"+
  "reps INT,"+
  "weight INT,"+
  "date DATE,"+
  "lbs BOOLEAN)";
  
pool.query(initialTable, function(err){ 
});

app.get('/', function(req, res, next) {
  var input = {};
  res.render('workout', input);
});

app.get('/insert', function(req, res, next) {
  pool.query("INSERT INTO workout (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err, result){
    var info = JSON.stringify(result);
    res.setHeader('Content-Type', 'application/json');
    res.send(info);
  });
});

app.get('/select', function(req, res, next) {
  pool.query('SELECT * FROM workout', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    var tableInfo = JSON.stringify(rows);
    res.setHeader('Content-Type', 'application/json');
    res.send(tableInfo);
  });
});

app.get('/delete', function(req, res, next) {
  var input = {};
  pool.query("DELETE FROM workout WHERE id=?", [req.query.id] , function(err, result){
    pool.query('SELECT * FROM workout', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      var tableInfo = JSON.stringify(rows);
      res.send(tableInfo);
    });
  });
});

app.get('/reset-table',function(req,res,next){
  var input = {};
  pool.query("DROP TABLE IF EXISTS workout", function(err){
    var createString = "CREATE TABLE workout("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      input.status = "Table reset";
      res.render('workout', input);
    })
  });
});

app.get('/update', function(req, res, next) {
  var input = {};
  pool.query('SELECT * FROM workout WHERE id=?', [req.query.id], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    console.log(rows);
    input.buttonId = "Submit-" + String(rows[0].id);
    input.name = rows[0].name;
    input.reps = rows[0].reps;
    input.weight = rows[0].weight;
    input.date = rows[0].date;
    input.lbs = rows[0].lbs;
    res.send('update', input);
  });
});

app.get('/update_submit', function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM workout WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE workout SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight || curVals.weight, req.query.date || curVals.date, req.query.lbs || curVals.lbs, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        res.redirect('http://localhost/');
      });
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