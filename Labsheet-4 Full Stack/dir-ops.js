// Task 3: Directory Operations
// Uses fs.mkdir, fs.writeFile, fs.readdir and fs.unlink.

const fs = require("fs");

const directory = "uploads";
const files = ["file1.txt", "file2.txt", "file3.txt"];

if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}

files.forEach((fileName) => {
    fs.writeFileSync(`${directory}/${fileName}`, "");
});

console.log("=== Task 3: Directory Operations ===");
console.log(`Created directory: ${directory}`);

fs.readdir(directory, (readError, fileList) => {
    if (readError) {
        console.error("Error listing directory:", readError.message);
        return;
    }

    console.log("Files before deletion:", fileList);

    const fileToDelete = `${directory}/file3.txt`;

    fs.unlink(fileToDelete, (deleteError) => {
        if (deleteError) {
            console.error("Error deleting file:", deleteError.message);
            return;
        }

        console.log("Deleted: file3.txt");

        fs.readdir(directory, (finalError, remainingFiles) => {
            if (finalError) {
                console.error("Error listing remaining files:", finalError.message);
                return;
            }

            console.log("Files after deletion:", remainingFiles);
        });
    });
});
