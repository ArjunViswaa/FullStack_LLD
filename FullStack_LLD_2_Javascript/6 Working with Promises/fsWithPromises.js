const fs = require('fs')
// const allPromises = fs.promises   // fs.promises is the object that allows us to perform async operations like then catch, async await in file read fs library
// console.log(allPromises)

// let promiseReadFile = fs.promises.readFile("f1.txt");

// promiseReadFile.then((data) => {
//     console.log("This is file data -> " + data);
// });

// promiseReadFile.catch((err) => {
//     console.log("This is Your Error -> " + err);
// });


// Reading multiple files
let f1p = fs.promises.readFile("f1.txt");
let f2p = fs.promises.readFile("f2.txt");
let f3p = fs.promises.readFile("f3.txt");

function readFileCallback(data) {
    console.log("This is the data -> " + data);
}

function handleError(err) {
    console.log("This is my error -> " + err);
}

// f1p.then(readFileCallback);
// f2p.then(readFileCallback);
// f3p.then(readFileCallback);

// f1p.catch(handleError);
// f2p.catch(handleError);
// f3p.catch(handleError);


// How to acheive serial operations in file reading
f1p.then((data) => {
    console.log("This is the data -> " + data);
    return fs.promises.readFile("f2.txt");
}).then((data) => {
    console.log("This is the data -> " + data);
    return fs.promises.readFile("f3.txt");
}).then(function (data) {
    console.log("This is File 3 Data -> " + data);
});
