// Task 7: HTTP Server with Manual Routing
// No framework is used. Routes are handled manually through req.url.

const http = require("http");

const PORT = 3000;

const students = [
    { id: 1, name: "Aarav Sharma", course: "B.Tech CSE", semester: 5 },
    { id: 2, name: "Priya Singh", course: "B.Tech CSE", semester: 5 },
    { id: 3, name: "Rohan Verma", course: "B.Tech CSE", semester: 5 }
];

const server = http.createServer((req, res) => {
    const url = req.url.split("?")[0];

    if (req.method !== "GET") {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Method Not Allowed" }));
        return;
    }

    // GET /
    if (url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Welcome to the Node.js Manual Routing Server!");
        return;
    }

    // GET /students
    if (url === "/students") {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify(students, null, 2));
        return;
    }

    // GET /students/:id
    const studentMatch = url.match(/^\/students\/(\d+)$/);

    if (studentMatch) {
        const id = Number(studentMatch[1]);
        const student = students.find((item) => item.id === id);

        if (student) {
            res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify(student, null, 2));
        } else {
            res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify({ error: "Student not found" }));
        }
        return;
    }

    // Any other route
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>404 - Not Found</title></head>
        <body>
            <h1>404 - Page Not Found</h1>
            <p>The requested route does not exist.</p>
        </body>
        </html>
    `);
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log("Routes:");
    console.log("GET /");
    console.log("GET /students");
    console.log("GET /students/1");
    console.log("GET /students/99 (404 JSON)");
});
