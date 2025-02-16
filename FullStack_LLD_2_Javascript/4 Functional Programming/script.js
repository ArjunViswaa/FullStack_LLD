function printName(callback1, callback2, callback3) {
    console.log("Arjun")
    callback1();
    callback2();
    callback3();
}

function printLastName() {
    console.log("Viswaa")
}

function printAge() {
    console.log(27)
}

function printAddress() {
    console.log("Coimbatore")
}

// printName(printLastName) // output : Arjun    Viswaa
// printLastName is the callback function called after execution of printName actions

// printName(printLastName, printAge, printAddress) // o/p -> Arjun Viswaa 27 Coimbatore

function greet(name) {
    return `Hello, ${name}!`;
}
function farewell(name) {
    return `Goodbye, ${name}!`;
}
function createSalutation(name, fn) {
    console.log(fn(name));
}
// createSalutation("Arjun", greet);
// createSalutation("Arjun", farewell);