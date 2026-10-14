// Task 11: Command-Line Arguments
// Usage: node calc-cli.js 10 5 +
// Uses process.argv.

const [, , firstArg, secondArg, operator] = process.argv;

const first = Number(firstArg);
const second = Number(secondArg);

if (
    firstArg === undefined ||
    secondArg === undefined ||
    operator === undefined ||
    Number.isNaN(first) ||
    Number.isNaN(second)
) {
    console.log("Usage: node calc-cli.js <number1> <number2> <operator>");
    console.log("Example: node calc-cli.js 10 5 +");
    process.exit(1);
}

let result;

switch (operator) {
    case "+":
        result = first + second;
        break;
    case "-":
        result = first - second;
        break;
    case "*":
        result = first * second;
        break;
    case "/":
        if (second === 0) {
            console.error("Error: Division by zero is not allowed.");
            process.exit(1);
        }
        result = first / second;
        break;
    default:
        console.error("Error: Operator must be +, -, *, or /.");
        process.exit(1);
}

console.log("=== Task 11: Command-Line Calculator ===");
console.log(`${first} ${operator} ${second} = ${result}`);
