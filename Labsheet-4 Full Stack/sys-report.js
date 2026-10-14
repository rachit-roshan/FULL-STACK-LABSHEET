// Task 5: OS Module Report
// Prints system information using Node.js os module.

const os = require("os");

console.log("=== Task 5: OS Module Report ===");
console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("Total Memory (GB):", (os.totalmem() / (1024 ** 3)).toFixed(2));
console.log("Free Memory (GB):", (os.freemem() / (1024 ** 3)).toFixed(2));
console.log("CPU Cores:", os.cpus().length);
console.log("System Uptime (minutes):", (os.uptime() / 60).toFixed(2));
