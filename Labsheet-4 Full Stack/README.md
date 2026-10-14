# BTCS303P — Lab Sheet 4: Node.js

**Course:** Full Stack Web Development  
**Department:** Computer Science & Engineering  
**Institution:** COER University, Roorkee

This project implements all 12 tasks specified in Lab Sheet 4 — Node.js.

## Project files

| Task | File(s) | Topic |
|---|---|---|
| 1 | `sum.js`, `even-odd.js`, `app1.js` | Custom Modules |
| 2 | `file-ops.js` | File System CRUD |
| 3 | `dir-ops.js` | Directory Operations |
| 4 | `path-demo.js` | Path Module |
| 5 | `sys-report.js` | OS Module Report |
| 6 | `order-events.js` | EventEmitter |
| 7 | `server.js` | HTTP Server + Manual Routing |
| 8 | `query-demo.js` | Query String Parsing |
| 9 | `stream-demo.js` | File Streams |
| 10 | `id-gen.js`, `package.json` | npm + nanoid |
| 11 | `calc-cli.js` | Command-Line Arguments |
| 12 | `env-demo.js` | Environment Variables |

## Setup

Open the terminal in this folder and run:

```bash
npm install
```

For Task 10, the assignment specifically requires nanoid v3. If needed:

```bash
npm install nanoid@3
```

Do **not** include `node_modules` in the submission ZIP.

## Run each task

```bash
node app1.js
node file-ops.js
node dir-ops.js
node path-demo.js
node sys-report.js
node order-events.js
node server.js
node query-demo.js
node stream-demo.js
node id-gen.js
node calc-cli.js 10 5 +
node env-demo.js
```

## Task 7 — Test the HTTP routes

Start:

```bash
node server.js
```

Then test these in a browser or Postman:

- `http://localhost:3000/`
- `http://localhost:3000/students`
- `http://localhost:3000/students/1`
- `http://localhost:3000/students/99` → 404 JSON error
- `http://localhost:3000/anything` → 404 HTML page

Stop the server with `Ctrl + C`.

## Task 8 — Query String

Start:

```bash
node query-demo.js
```

Open:

```text
http://localhost:3001/search?keyword=node
```

The response echoes the keyword.

## Task 11 — Calculator examples

```bash
node calc-cli.js 10 5 +
node calc-cli.js 10 5 -
node calc-cli.js 10 5 "*"
node calc-cli.js 10 5 /
```

On PowerShell, quoting `*` is recommended so it is passed literally.

## Task 12 — Environment variable on Windows

PowerShell:

```powershell
$env:PORT=5000
node env-demo.js
```

Command Prompt:

```cmd
set PORT=5000 && node env-demo.js
```

Linux/macOS:

```bash
PORT=5000 node env-demo.js
```

If `PORT` is not supplied, the application uses port `4000`.

## Submission note

`file-ops.js` intentionally contains placeholder values:

- `Name: Student Name`
- `Roll Number: Roll Number`

Replace these two values with your actual details before submission.

The programs are written using Node.js core modules and, for Task 10, the required external `nanoid` package.
