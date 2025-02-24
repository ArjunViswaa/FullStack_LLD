function main(str) {
    // Write your code here
    // return the count
    let count = 0;
    str = str.toLowerCase();
    for(let i=0; i<str.length; i++) {
        let letter = str[i];
        if (letter == "a" || letter == "e" || letter == "i" || letter == "o" || letter == "u") {
            count++;
        }
    }
    return count;
}

console.log(main("Hello Aoarldssion"));