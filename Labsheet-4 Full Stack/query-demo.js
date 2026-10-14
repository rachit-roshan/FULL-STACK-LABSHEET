// Task 8: Query String Parsing
// Uses require("url").parse(req.url, true).query.

const http = require("http");
const url = require("url");

const PORT = 3001;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === "GET" && parsedUrl.pathname === "/search") {
        const keyword = parsedUrl.query.keyword || "No keyword provided";

        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(`Search keyword: ${keyword}`);
        return;
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 - Route not found");
});

server.listen(PORT, () => {
    console.log(`Query server running at http://localhost:${PORT}`);
    console.log(`Try: http://localhost:${PORT}/search?keyword=node`);
});
