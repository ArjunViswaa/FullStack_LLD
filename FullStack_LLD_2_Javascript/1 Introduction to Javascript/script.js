// console.log("Hello world from external JS")

var myFirstVariable = "Hello from my First Variable";
console.log(myFirstVariable)
myFirstVariable = true
// console.log("changed to: " + myFirstVariable)

/* Reinitialization - var type can be reinitialized and redeclared */
var myFirstVariable = 'another variable'
// console.log("changed to: " + myFirstVariable)

// ES-6 made a correction here.
let val = "hello"
val = "bye"
val = true;
// console.log(val)
// let val = "okay" // let doesnot allow you to reinitialize but we can redeclare

const pi = 3.14;
// pi = 1.23 // TypeError: Assignment to constant variable.
// console.log(pi)

let value = 'hello'
value = 1234

/* Number type */
let number1 = 12
let number2 = 12.345
// console.log(11/0) // Infinity
// console.log("string"/100) // NaN - Not a Number
// console.log("mr. Ambani's networht is : ", 100_000_000_000 + 102_000) // _ separated numbers
// console.log("Mr.Musk's network is : ", 2e11) // 2 x (10 ^ 9)
// console.log("millionth of a second : ", 1e-6) // 1 x (10 ^ -6)

console.log("123" + 10) // "123" + "10" = "12310" --> If + operator is included, then it's concatenated
console.log(+ "123" + 10) // 123 + 10 = 133
console.log("123" - 10) // 123 - 10 = 113

/* BigInt
    * number type can represent numbers from -(2^53-1) to (2^53-1) (64 bit memory representation)
    * bigint can represent numbers above or below this range
    * represent bigint by adding n at the end of the number 1n, 2n
*/

/* String: 
    * single quote - 'Hello'
    * double quote - "Hello"
    * backticks - `Hello`
*/

const activeUsers = 1000
const message = `There are ${activeUsers} users online`
const message2 = "There are " + activeUsers + "users online"

console.log(1 < 2) // true
console.log(1 == 2) // false

