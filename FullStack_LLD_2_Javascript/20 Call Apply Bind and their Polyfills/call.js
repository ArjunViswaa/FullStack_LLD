const person1 = {
    name: "Mr X",
    age: 25,
    printNameAndAge: function () {
        console.log(`My name is ${this.name} and I am ${this.age} years old`);
    },
};

const person2 = {
    name: "MRr Y",
    age: 30
};

person1.printNameAndAge(); // My name is Mr X and I am 25 years old

// person2.printNameandAge(); // TypeError: person2.printNameandAge is not a function

// Using the call method to allow person2 to use person1's method
person1.printNameAndAge.call(person2);

// call method accepts parameters...
const person1Params = {
    name: "Mr X",
    age: 25,
    printNameAndAge: function (location) {
        console.log(`My name is ${this.name} and I am ${this.age} years old, and I am from ${location}`);
    },
};

person1Params.printNameAndAge.call(person2, "San Francisco"); // My name is MRr Y and I am 30 years old, and I am from San Francisco
