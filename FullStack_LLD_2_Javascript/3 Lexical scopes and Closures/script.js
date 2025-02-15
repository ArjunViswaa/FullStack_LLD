function greet() {
    var msg = "Hello Worldsss"
    sayHNW()
    function sayHNW() {
        console.log(msg)
    }

    // console.log(msg)
}
// var msg = "Hello Worldsss"
// greet()
// console.log("outer", msg)

// if (true) {
//     let blockScopedVar = "I am inside an if block";
//     console.log(blockScopedVar); // Works fine
// }
// console.log(blockScopedVar); // ReferenceError: blockScopedVar is not defined

// let val = 'some msg'
// if (true) {
//     let val = 'some other msg' // shadowing
//     console.log("inside if", val)
// }
// console.log("outside if", val)

// if (true) {
//     var functionScopedVar = "I am var variable";
// }
// console.log(functionScopedVar); // Works fine

// Var declared variables are function scoped, let and const declared variables are block scoped

// Closure ....
// function grandMa() {
//     const secret = 'Maggi Masala'
//     function bitti() {
//         console.log("i know the secret", secret) // secret variable is part of Closure(grandMa)
//     }
//     bitti()
// }
// grandMa()

function createCounter() {
    let count = 0;
    return function counter() {
        count++;
        return count;
    }
}

const counter1 = createCounter()
const counter2 = createCounter()

console.log(counter1()) // 1 Closure(createCounter) it will be stored
console.log(counter1()) // 2
console.log(counter1()) // 3
console.log(counter2()) // 1
console.log(counter2()) // 2