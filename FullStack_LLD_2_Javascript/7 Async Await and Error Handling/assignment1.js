function fetchByPromise(fileName) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(`content : ${fileName}`);
        }, 100 * Math.random());
    });
}

async function nSeries(fileArray, ansArray) {
    for(let i=0; i<fileArray.length; i++) {
        const value = await fetchByPromise(fileArray[i]);
        ansArray.push(value)
    }
    ansArray.push('All files have been read')
    return ansArray;
}

let ansArray = [];
let fileArray = ["FILE 1", "FILE 2"];
console.log(nSeries(fileArray, ansArray));