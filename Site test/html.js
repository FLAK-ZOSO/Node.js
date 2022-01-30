const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;

function requestListener(req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    fs.readFile('main.html')
        .then(contents => {
            res.end(contents);
        })
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});