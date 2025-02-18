// Method for placing the order
function placeOrder(drink) {
    return new Promise((resolve, reject) => {
        if (drink === 'coffee') {
            resolve("Order can be placed for coffee")
        } else {
            reject("Order cannot be placed for " + drink)
        }
    })
}

// placeOrder("coffee").then((orderStat) => {
//     console.log(orderStat);
// })

// placeOrder("tea").then((orderStat) => {
//     console.log(orderStat);
// }).catch((err) => {
//     console.log(err);
// })

// function for processing the order
let processOrder = (orderPlaced) => {
    return new Promise((resolve, reject) => {
        resolve(`${orderPlaced} and served...`)
    })
}

// function for bill generation
let generateBill = (processedOrder) => {
    return new Promise((resolve, reject) => {
        resolve(`${processedOrder} and Bill Generated with Rs.200/-`)
    })
}

// Using promise handling...
// placeOrder('coffee').then((orderStat) => {
//     console.log(orderStat);
//     return processOrder(orderStat);
// })
// .then((orderProcess) => {
//     console.log(orderProcess);
//     return generateBill(orderProcess);
// })
// .then((billDetails) => {
//     console.log(billDetails);
// })

// Using Async / Await...
// let orderstatus = await placeOrder("coffee");
// console.log(orderstatus);
// let processedOrder = await processOrder(orderstatus);
// console.log(processedOrder);
// let generatedBill = await generateBill(processedOrder);
// console.log(generatedBill);

// Error handling ...
async function serveOrder() {
    try {
        let orderstatus = await placeOrder("tea");
        console.log(orderstatus);
        let processedOrder = await processOrder(orderstatus);
        console.log(processedOrder);
        let generatedBill = await generateBill(processedOrder);
        console.log(generatedBill);
    } catch (error) {
        console.log(error);
    }
}
serveOrder();