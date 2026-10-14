// Task 12: Environment Variables
// Reads PORT from process.env and defaults to 4000.

const http = require("http");

const PORT = Number(process.env.PORT) || 4000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Node.js server is running on port ${PORT}`);
});

server.listen(PORT, () => {
    console.log(`Environment variable demo server started on port ${PORT}`);
    console.log(`Open: http://localhost:${PORT}`);
});
