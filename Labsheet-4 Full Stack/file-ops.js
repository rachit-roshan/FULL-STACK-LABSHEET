// Task 2: File System — CRUD on a Text File
// Uses fs.writeFile, fs.appendFile, fs.readFile and fs.rename.

const fs = require("fs");

const originalFile = "student.txt";
const renamedFile = "profile.txt";

fs.writeFile(
    originalFile,
    "Name: Student Name\nRoll Number: Roll Number\n",
    (writeError) => {
        if (writeError) {
            console.error("Error creating/writing file:", writeError.message);
            return;
        }

        fs.appendFile(
            originalFile,
            "Course: Full Stack Web Development\n",
            (appendError) => {
                if (appendError) {
                    console.error("Error appending file:", appendError.message);
                    return;
                }

                fs.readFile(originalFile, "utf8", (readError, data) => {
                    if (readError) {
                        console.error("Error reading file:", readError.message);
                        return;
                    }

                    console.log("=== Task 2: File System Operations ===");
                    console.log("Full file content:");
                    console.log(data);

                    fs.rename(originalFile, renamedFile, (renameError) => {
                        if (renameError) {
                            console.error("Error renaming file:", renameError.message);
                            return;
                        }

                        console.log(`File renamed successfully: ${originalFile} -> ${renamedFile}`);
                    });
                });
            }
        );
    }
);
