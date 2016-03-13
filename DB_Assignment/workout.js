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
app.set('view engine', 'handlebars');
app.set('port', 4999);
app.use(express.static(__dirname + '/views/public'));

// Create the table when the server starts
var initialTable = "CREATE TABLE IF NOT EXISTS workouts("+
  "id INT PRIMARY KEY AUTO_INCREMENT,"+
  "name VARCHAR(255) NOT NULL,"+
  "reps INT,"+
  "weight INT,"+
  "date DATE,"+
  "lbs BOOLEAN)";
  
pool.query(initialTable, function(err){ 
});

pool.query("INSERT INTO workout (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (a, 1, 1, 2015-01-01, 1),(b, 2, 2, 2015-01-01, 0)", function(err, result){
});

app.get('/', function(req, res, next) {
  var input = {};
  pool.query('SELECT * FROM workout', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    input.results = "Table Loaded";
    input.tableInfo = JSON.stringify(rows);
    res.setHeader('Content-Type', 'application/json');
    res.render("workout", input);
  });
});

app.get('/testing', function(req, res, next) {
  var input = {};
  pool.query('SELECT * FROM workout', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    input.results = "Table Loaded";
    input.tableInfo = JSON.stringify(rows);
    res.setHeader('Content-Type', 'application/json');
    res.render("testing", input);
  });
});


app.get('/select', function(req, res, next) {
  var input = {};
  pool.query('SELECT * FROM workout', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    input.tableInfo = "Table Loaded";
    input.tableInfo = JSON.stringify(rows);
    res.setHeader('Content-Type', 'application/json');
    res.json(input);
  });
});

app.get('/update', function(req, res, next) {
  var input = {};
  input.javascriptfile = "/js/intro.js";
  input.chartdata = "Blue";
  // Dummy data for main bootstrap file
  input.one = "Text";
  input.two = 0;
  input.three = 0;
  input.four = 0;
  res.render('workout', input);
});

app.get('/delete', function(req, res, next) {
  var input = {};
  input.javascriptfile = "/js/intro.js";
  input.chartdata = "Blue";
  // Dummy data for main bootstrap file
  input.one = "Text";
  input.two = 0;
  input.three = 0;
  input.four = 0;
  res.render('workout', input);
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('workout', context);
    })
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