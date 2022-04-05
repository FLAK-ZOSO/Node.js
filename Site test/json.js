const http = require("http");

const host = 'localhost';
const port = 8000;

function requestListener(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200); // https://redgifs.com/watch/frenchunhappymoose
    res.end(`{"message": "This is a JSON response"}`);
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});