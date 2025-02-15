// function accepting parameters
function ServeBeverage(drink, quantity) {
    console.log('I want ' + quantity + " " + drink)
}

// calling function by passing arguments
// serveBeverage('coffee', 4) // print I want 4 coffee

// Traditional function syntax : 
// function sayHi() {
//     console.log('mrinal says hi')
// }

// sayHi()

// Function as Expressions syntax : 
let sayHi = function () {
    console.log('Mr. X says hi')
}

// sayHi()
console.log(msg) // undefined since the variable is not initialized yet but it is already declared - "VAR" type variable decl
console.log(greet) // function can be accessed before declaration - This feature or behavior in which we are able to access 
// variables and functions before they are defined is called as HOISTING in JS

// var msg = 'Hello'
function greet() {
    console.log(msg, " Happy New Year")
}
// console.log(msg)
// greet()

let msg = "Hello" // script.js:22 Uncaught ReferenceError: Cannot access 'msg' before initialization - for "LET" type variable decl
// Hoisting doesn't happen for Let and Const type variables.