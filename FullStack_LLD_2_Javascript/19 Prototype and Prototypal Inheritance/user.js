function User(name) {
    this.name = name
    this.msg = function () {
        console.log(`Hello ${this.name}!`)
    }
}

const user1 = new User('Kohli')
const user2 = new User('Dhoni')
console.log(user1.msg === user2.msg) // false

function BetterUser(name) {
    this.name = name
}

BetterUser.prototype.msg = function () {
    console.log(`Hello ${this.name}!`)
}

const user3 = new BetterUser('Shubman')
const user4 = new BetterUser('Rohit')
console.log(user3.msg === user4.msg) // true


/* String Prototype Manipulation */
String.prototype.crazyMethod = function (pattern) {
    return this.split("").join(pattern)
}

console.log("scaler".crazyMethod("->"))
console.log("scaler".crazyMethod("*"))
console.log("scaler".crazyMethod("<3"))