const fs = require('fs');

fs.readFile('f1.txt', (err, data) => {
    if(err) {
        console.log("error", err);
        return;
    }
    const processedData = data;
    fs.writeFile('f2.txt', processedData, (err) => {
        if(err) {
            console.log("error", err);
            return;
        }
        // Multiple operations could be chained here causing callback hell
        console.log("File processed and written successfully.");
    });
})