const http = require("http");
const fs = require('fs');

const host = 'localhost';
const port = 8000;

function requestListener(req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    fs.readFile('main.html', 'utf-8', (_, data) => {
        res.end(data);
    })
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});