#!/usr/bin/env node
var http = require('http');
var fs = require('fs');


var server = http.createServer(function (_req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('index.html', (err, data) => {
		if (err) throw err;
		res.end(data);
	});
})
server.listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');