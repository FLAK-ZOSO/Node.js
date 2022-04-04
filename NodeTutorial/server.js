var http = require('http');
var fs = require('fs');

const server = http.createServer();
server.on('request', (request, response) => {
    const { method, url } = request;
    const { headers } = request;
    const userAgent = headers['user-agent'];
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        // at this point, `body` has the entire request body stored in it as a string
    });
    request.on('error', (err) => {
        // This prints the error message and stack trace to `stderr`.
        console.error(err.stack);
    });

    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('index.html', (err, data) => {
		if (err) throw err;
		response.end(data);
	});
    // response.setHeader('Content-Type', 'application/json');

    setTimeout(() => {
        response.on('error', (err) => {
            console.error(err);
        });

        response.writeHead(200, {'Content-Type': 'application/json'})
        const responseBody = { headers, method, url, body };
        response.write(JSON.stringify(responseBody));
        response.end();
    }, 0.5);
});
server.listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');
// https://stackoverflow.com/questions/71738950/node-js-is-giving-different-http-responses-with-different-timeouts