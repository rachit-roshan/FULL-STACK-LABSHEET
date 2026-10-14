// Task 1: Custom Modules
// Exports a function that checks whether a number is even or odd.

function evenOdd(number) {
    return number % 2 === 0 ? "Even" : "Odd";
}

module.exports = evenOdd;
