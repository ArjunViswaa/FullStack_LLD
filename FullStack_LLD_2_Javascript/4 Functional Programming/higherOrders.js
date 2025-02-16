let arr = [1, 2, 3, 4, 5];

// Normal way of doing
function squareArrFn(arr) {
    let squareArr = []
    for (let i = 0; i < arr.length; i++) {
        squareArr.push(arr[i] * arr[i])
    }
    return squareArr;
}
let squareArrFinal = squareArrFn(arr)
// console.log(squareArrFinal)

// Map - higher order function
let squareArrFromMap = arr.map((num) => {
    return num * num
})
// console.log(squareArrFromMap); // same output as squareArrFinal

// Map function - Shorthand
let areaFromRadius = arr.map((rad) => Math.PI * rad * rad)
// console.log(areaFromRadius)

const transactions = [1000, 3000, 4000, 2000, - 898, 3800, -4500];
const inrtToUsd = 80;
let conversionToDollars = transactions.map(function (amount) {
    return amount / inrtToUsd;
})
// console.log(conversionToDollars)


// Filter - higher order function
let myArr = [1, 2, 5, 7, 8, 2, 6, 9, 13, 17]
let evenArray = myArr.filter((num) => {
    return num % 2 == 0;
})
// console.log(evenArray) // Return the elements only divisble by 2 or even

const transactionsList = [1000, 3000, 4000, 2000, - 898, 3800, -4500];
let creditedTransactions = transactionsList.filter((amount) => {
    return amount > 0;
})

// console.log(creditedTransactions)


// Sum of an array - Normal implementation
let arr1 = [1, 2, 3, 4, 5]
let sum = 0
for (let i = 0; i < arr1.length; i++) {
    sum = sum + arr1[i]
}
console.log(sum)

// Reduce - higher order function
const totalSum = arr1.reduce((accumulator, currVal) => {
    accumulator += currVal
    return accumulator
}, 0) // 0 is the initial value and is optional if not provided currVal is taken as first value of the arr1 array
console.log(totalSum)