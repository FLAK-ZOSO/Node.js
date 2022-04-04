const http = require('http');
const fs = require('fs');


const server = http.createServer((request, response) => {
    request.on('error', (err) => {
		console.error(err);
		response.statusCode = 400;
		response.end();
	});
    console.log("Yay");
    response.writeHead(200, { 'Content-Type': 'text/html' });
    console.log("hello");
    fs.readFileSync('index.html', (err, data_) => {
        if (err) throw err;
        console.log("Yahoo");
        response.end(data_);
    });

    if (request.method === 'POST' && request.url === '/') {
        console.log("Server: POST /");
		let data = '';
        request.on('data', chunk => {
            data += chunk;
        })
        
        request.on('end', () => {
            console.log(JSON.parse(data).todo); // 'Buy the milk'
            response.end();
        })
	}
})
server.listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');