// Task 6: Events Module — Custom EventEmitter

const EventEmitter = require("events").EventEmitter;

const orderEmitter = new EventEmitter();

orderEmitter.on("orderPlaced", (order) => {
    console.log("\n=== Order Receipt ===");
    console.log(`Order ID : ${order.id}`);
    console.log(`Item     : ${order.item}`);
    console.log(`Amount   : ₹${order.amount.toFixed(2)}`);
    console.log("====================");
});

const orders = [
    { id: 101, item: "Laptop Stand", amount: 1299 },
    { id: 102, item: "Wireless Mouse", amount: 799 },
    { id: 103, item: "USB-C Hub", amount: 1599 }
];

console.log("=== Task 6: Custom EventEmitter ===");

orders.forEach((order) => {
    orderEmitter.emit("orderPlaced", order);
});
