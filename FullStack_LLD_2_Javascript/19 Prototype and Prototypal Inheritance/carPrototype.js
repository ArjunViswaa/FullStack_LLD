const carPrototype = {
    displayInfo: function () {
        return `This is a ${this.year} ${this.model}.`;
    }
};

const car1 = Object.create(carPrototype);
car1.model = "Toyota Camry";
car1.year = 2021;

const car2 = Object.create(carPrototype);
car2.model = "Ford Mustang";
car2.year = 2023;

// console.log(car1.displayInfo()); // "This is a 2021 Toyota Camry."
// console.log(car2.displayInfo()); // "This is a 2023 Ford Mustang."


/* Detaching the prototype from Object... */
const obj = { name: 'Sample Object' };
// console.log(obj.toString()); // Normally works

// Set prototype to null
obj.__proto__ = null;

try {
    // console.log(obj.toString()); // This will throw an error
} catch (e) {
    // console.log("Error:", e.message); // Error: obj.toString is not a function
}
// There is no built-in way to restore the original prototype once it's set to null.


/* Constructor Property Manipulation... */
function Animal() {

}
// console.log(Animal.prototype.constructor)

Animal.prototype.speak = function () {
    console.log("Sound!");
};

function Dog() {

}

Dog.prototype = Object.create(Animal.prototype);
const dog = new Dog();

console.log(dog); // true
console.log(dog.constructor.name); // Animal

Dog.prototype.constructor = Dog;
console.log(dog.constructor.name); // Dog


/* Prototype chaining... */
function Rabbit() {

}

Rabbit.prototype = {
    eats: true,
};

let rabbit = new Rabbit();
Rabbit.prototype = {};
let rabbit2 = new Rabbit();

console.log(rabbit.eats); // ? -> true
console.log(rabbit2.eats); // ? -> undefined