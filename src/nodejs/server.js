/**
 * Created by Alexander Nikiforov on 21.10.2016.
 */
/*var http = require('http'),
    data = require('./data');

var server = new http.Server(); //event

server.listen(1337, '127.0.0.1');

var counter = 0;
server.on('request', function (req, res) {
  res.end('ZigaZaga ' + ++counter + ' ' + data.Hello);
});
*/


var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});


function accept(req, res) {

  if (req.url == '/users.json') {
    // искусственная задержка для наглядности
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
