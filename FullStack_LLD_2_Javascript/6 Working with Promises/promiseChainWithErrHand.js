// Promises chaining... handling rejections
const cleanRoom = () => {
    return new Promise((resolve, reject) => {
        if(Math.random() > 0.5) {
            resolve("I cleaned the room");
        } else {
            reject("Not cleant the room")
        }
    })
}

const eatFood = (message) => {
    return new Promise((resolve, reject) => {
        if(Math.random() > 0.5) {
            resolve(`${message}, Ate the prepared food`);
        } else {
            reject("Haven't eaten the food")
        }
    })
}

const buyGrocerries = (message) => {
    return new Promise((resolve, reject) => {
        if(Math.random() > 0.5) {
            resolve(`${message} and Bought grocerries`)
        } else {
            reject("Haven't bought grocerries")
        }
    })
}

// Promise chaining execution - common catch to handle rejections
cleanRoom().then((result) => {
    console.log(result)
    return eatFood(result);
}).then((result) => {
    console.log(result)
    return buyGrocerries(result);
}).then((result) => {
    console.log(result)
    console.log(result)
}).catch((err) => {
    console.log("Failed -> ", err);
})