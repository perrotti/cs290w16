var http = require('http');

http.createServer(function(req,res){
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world from Isaiah!');
}).listen(2000);

console.log('Server started on localhost:2000; press Ctrl-C to terminate....');