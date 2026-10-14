// Task 9: Reading a Large File with Streams
// Creates 50+ lines, then reads the file using fs.createReadStream.

const fs = require("fs");

const fileName = "large-file.txt";

let content = "";

for (let i = 1; i <= 60; i++) {
    content += `This is line ${i} of the stream demonstration file.\n`;
}

fs.writeFileSync(fileName, content);

console.log("=== Task 9: Reading a Large File with Streams ===");
console.log(`Created ${fileName} with 60 lines.`);
console.log("Reading file in chunks...");

const readStream = fs.createReadStream(fileName, { encoding: "utf8" });

let chunkCount = 0;

readStream.on("data", (chunk) => {
    chunkCount++;
    console.log(`Chunk ${chunkCount} received: ${Buffer.byteLength(chunk, "utf8")} bytes`);
});

readStream.on("end", () => {
    console.log(`Stream completed. Total chunks received: ${chunkCount}`);
});

readStream.on("error", (error) => {
    console.error("Stream error:", error.message);
});
