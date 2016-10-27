/**
 * Created by Alexander Nikiforov on 21.10.2016.
 */
var http = require('http'),
  offers = require('./offers.json'),
  users = require('./users.json');

var port = 8081;

var s = http.createServer();
s.on('request', function(request, response) {
  response.writeHead(200);
  console.log(request.method);
  console.log(request.headers);
  console.log(request.url);
  response.write('hi');
  response.end();
});

s.listen(port);
console.log('Browse to http://127.0.0.1:' + port);



/*var http = require('http'),
    offers = require('./offers.json'),
    users = require('./users.json');


var server = new http.Server(); //event

server.listen(1337, '127.0.0.1');

server.on('request', function (req, res) {
  res.end("ziga");
});


/*
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});

/*
function accept(req, res) {

  if (req.url == '/users.json') {
    file.serve(req, res);
  }
  else {
    file.serve(req, res);
  }

}


// ------ запустить сервер -------

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}



/* events:
 listening
 connection - keep alive
 request

  */
