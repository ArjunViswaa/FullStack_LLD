// import { api_key } from "./util.js";
import variant from "./util.js";

import * as util from "./util.js";
import { api_key, next as newer } from "./util.js";

// console.log(api_key);
// console.log(variant);

// console.log(util.api_key);
// console.log(newer);

// function greetUser(username, message = "Hello") {
//     console.log(username, message);
//     return `Hi, I am ${username}. ${message}`;
// }

// const greetings1 = greetUser("Max");
// console.log(greetings1);

// const greetings2 = greetUser("Max", "Hello what's up");
// console.log(greetings2);

// Arrow function syntax
// export default () => {
//     console.log("Default function");
// }


// Objects : 
const user = {
    name: "Arjun",
    age: 27,
    greet: function() {
        console.log(`Hello ${this.name}`)
    }
}

// user.greet();

// Arrays : 
const hobbies = ["Sports", "Cooking", "Gardening"];
// console.log(hobbies[0]);

hobbies.push("Coding");
// console.log(hobbies);

const sports_index = hobbies.findIndex((item) => {
    return item === "Sports";
})

const cooking_index = hobbies.findIndex(item => item === "Cooking"); // shorthand

// console.log(sports_index); // OP : 0
// console.log(cooking_index); // OP : 1

const exclaimed_hobbies = hobbies.map((hobby) => hobby + "!");
// console.log(exclaimed_hobbies); // OP : ['Sports!', 'Cooking!', 'Gardening!', 'Coding!']


// Destructuring arrays and objects...
const usernamedata = ["Arjun", "Viswaa"];

// const firstname = usernamedata[0];
// const lastname = usernamedata[1];

const [firstname, lastname] = ["Arjun", "Viswaa"];
console.log(firstname + " " + lastname);

// const { name, age } = {
//     name: "Arjun",
//     age: 27
// }

// console.log(`I am ${name} and I am ${age} years old`);

const { name: username, age } = { // username is alias for name
    name: "Arjun",
    age: 27
}

// console.log(`I am ${username} and I am ${age} years old`);


// Spread Operator...
const newHobbies = ["Reading", "Dancing"];
const mergedHobbies = [...hobbies, ...newHobbies];
// console.log(mergedHobbies); // OP : ['Sports', 'Cooking', 'Gardening', 'Coding', 'Reading', 'Dancing']

const extendedUser = {
    isAdmin: true,
    ...user
}
// console.log(extendedUser); // OP : {isAdmin: true, name: 'Arjun', age: 27, greet: ƒ}

// const password = prompt("Your password...");

// if(password === "Hello") {
//     console.log("Hello works!");
// } else if(password === "hello") {
//     console.log("hello works !");
// } else {
//     console.log("Access denied");
// }

// For of for array iteration...
// for(const hobby of hobbies) {
//     console.log(hobby);
// }
