// Task 1: Custom Modules
// Imports and uses the custom modules.

const sum = require("./sum");
const evenOdd = require("./even-odd");

const a = 10;
const b = 15;
const number = 24;

console.log("=== Task 1: Custom Modules ===");
console.log(`Sum of ${a} and ${b}: ${sum(a, b)}`);
console.log(`${number} is ${evenOdd(number)}`);
