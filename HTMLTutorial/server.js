var dispatcher = require('httpdispatcher');


dispatcher.onGet("/page1", function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Page One');
});
dispatcher.onPost("/page2", function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Page Two');
});
http.createServer(function (req, res) {
  dispatcher.dispatch(req, res);
}).listen(8080, '127.0.0.1');