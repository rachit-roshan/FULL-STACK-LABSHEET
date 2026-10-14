// Task 4: Path Module
// Demonstrates dirname, basename, extname and resolve.

const path = require("path");

const hardcodedPath = "/home/user/data/report.pdf";
const relativePath = "./data/report.pdf";

console.log("=== Task 4: Path Module ===");
console.log("Original path:", hardcodedPath);
console.log("Directory name:", path.dirname(hardcodedPath));
console.log("Base name:", path.basename(hardcodedPath));
console.log("Extension:", path.extname(hardcodedPath));
console.log("Absolute path from relative path:", path.resolve(relativePath));
