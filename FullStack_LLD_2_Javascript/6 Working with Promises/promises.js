// Syntax
let promise = new Promise((resolve, reject) => {
    // executor (the producing code)
})

// const coinTossPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//     const isHeads = Math.random() > 0.5;
//     isHeads ?
//         resolve("Heads") :
//         reject("Tails- Coin toss resulted in tails, considered as a fail for this example");
//     }, 2000)
// })

// Then, Catch and Finally...
// coinTossPromise.then((result) => {
//     console.log("success -> ", result);
// })
// .catch((err) => {
//     console.log("Error msg", err);
// })
// .finally(() => {
//     console.log("Promise settled")
// })


// Promises chaining...
const cleanRoom = () => {
    return new Promise((resolve, reject) => {
        resolve("I cleaned the room");
    })
}

const eatFood = (message) => {
    return new Promise((resolve, reject) => {
        console.log(message);
        resolve(`${message}, Ate the prepared food`);
    })
}

const buyGrocerries = (message) => {
    return new Promise((resolve, reject) => {
        console.log(message);
        resolve(`${message} and Bought grocerries`)
    })
}

// Promise chaining execution
cleanRoom().then((result) => {
    return eatFood(result);
}).then((result) => {
    return buyGrocerries(result);
}).then((result) => {
    console.log(result)
})