const fs = require('fs');

console.log("starting");

// const content = Math.random().toString(36).repeat(1000000)
// const content = "This is file 2."
// fs.writeFileSync('file2.txt', content)

// Read file sync
// const data1 = fs.readFileSync('file1.txt');
// console.log("data of file1", data1)

// Read file async
const data1 = fs.readFile('file1.txt', (err, data) => {
    if(err) {
        console.log("error", err);
    } else {
        console.log("file1", data);
    }
})

// const data2 = fs.readFileSync('file2.txt')
// console.log("data of file2", data2)

const data2 = fs.readFile('file2.txt', (err, data) => {
    if(err) {
        console.log("error", err);
    } else {
        console.log("file2", data);
    }
})

console.log("ending")