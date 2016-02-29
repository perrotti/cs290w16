var express = require('express');

var app = express();

app.set('port', 4000);

app.get('/', function(req, res) {
  res.type('text/plain');
  res.send('Welcome to the jungle, we\'ve got fun and games');
});

app.get('/beach', function(req, res) {
  res.type('text/plain');
  res.send('Welcome to the beach, we are livin day by day');
});

app.get('/number', function(req, res) {
  res.type('text/plain');
  var rNum = Math.floor((Math.random() * 10)) + 1;
  res.send('Random Number (1-10): ' + rNum); 
});

app.use(function(req,res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

