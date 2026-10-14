// Task 10: npm and an External Package
// Generates 5 unique IDs using nanoid v3.

const { nanoid } = require("nanoid");

console.log("=== Task 10: Unique ID Generator ===");

for (let i = 1; i <= 5; i++) {
    console.log(`ID ${i}: ${nanoid()}`);
}
