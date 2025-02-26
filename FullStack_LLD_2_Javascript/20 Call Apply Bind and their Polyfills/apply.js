const person1 = {
    name: 'Arjun',
    age: 27,
    describe: function () {
        console.log(`My name is ${this.name} and I am ${this.age} years old`);
    }
};

person1.describe(); // Output: My name is Arjun and I am 27 years old

const person2 = {
    name: 'Rakesh',
    age: 30
};

person1.describe.apply(person2); // Output: My name is Rakesh and I am 30 years old

const person1Params = {
    name: 'Arjun',
    age: 27,
    describe: function (location, hobbies) {
        console.log(`My name is ${this.name} and I am ${this.age} years old, I am from ${location} and I like ${hobbies}`);
    }
};

// Using apply to invoke person1's method on person2 with additional arguments
person1Params.describe.apply(person2, ["San Francisco", "Travelling"]);


// Whats the use of Apply then, just arrays parameters ?? No.
// Usecase 1 : 

const numbers = [5, 6, 2, 3, 7];

// Using Math.max directly with an array does not work:
console.log(Math.max(numbers)); // NaN - because Math.max expects separate number arguments, not a single array.

// Using apply to spread the numbers array into individual arguments:
const maxNumber = Math.max.apply(null, numbers);
console.log(maxNumber); // Output: 7

// However using JS ES6 Spread operator we could use it like this.
const maxNumberUsingSpread = Math.max(...numbers);
console.log(maxNumberUsingSpread); // Output: 7