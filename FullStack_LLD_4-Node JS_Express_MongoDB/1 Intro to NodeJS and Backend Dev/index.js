// File System - module...
const fs = require("fs"); // Common JS Module syntax
// import fs from "fs"; // ES6 Module syntax

// Read file - Async
// fs.readFile("./hello.txt", "utf8", (err, data) => { // Error first callback
//     if (err) {
//         console.log("error" + err);
//     }
//     console.log(data);
// });


// Write file - Async
// fs.writeFile("./example.txt", "Hello from NodeJS", (err) => {
//     if (err) {
//         console.log("error" + err);
//     }
//     console.log("file created");
// });


// Append file - Async
// fs.appendFile("./example.txt", "... Hello from NodeJS 1111", (err) => {
//     if (err) {
//         console.log("error" + err);
//     }
//     console.log("file created");
// });


// Rename file - Async
// fs.rename("./example.txt", "./example2.txt", (err) => {
//     if (err) {
//         console.log("error" + err);
//     }
//     console.log("file Renamed");
// });


// Delete file - Async
// fs.unlink("./example.txt", (err) => {
//     if (err) {
//         console.log("error" + err);
//     }
//     console.log("file deleted");
// });


// Stats - Async
// fs.stat("./example2.txt", (err, stats) => {
//     if (err) {
//         console.log("error" + err);
//     }
//     console.log(stats.size);
//     console.log(stats.isDirectory());
// });


// Path Module
// File path differs for different OS
// const path = require("path");
// const filePath = path.join("folder", "subfolder", "test.txt");
// const absolutePath = path.resolve("folder", "subfolder", "test.txt");
// const fileName = path.basename(absolutePath);
// const ext = path.extname(absolutePath);
// console.log(fileName);
// console.log(ext);
// console.log(filePath);
// console.log(absolutePath);


// Copying file from one location to another - Streams
// const srcFilePath = "./dir/file1.txt";
// const destFilePath = "./dir/file2.txt";

// // Create read stream
// const readStream = fs.createReadStream(srcFilePath);

// // Create write stream
// const writeStream = fs.createWriteStream(destFilePath);

// // Pipe the read stream to write stream
// readStream.pipe(writeStream);

// readStream.on("error", (err) => {
//     console.log("error while reading srcfile" + err);
// });

// writeStream.on("error", (err) => {
//     console.log("error while writing in destination file" + err);
// });

// writeStream.on("finish", () => {
//     console.log("file copied");
// });