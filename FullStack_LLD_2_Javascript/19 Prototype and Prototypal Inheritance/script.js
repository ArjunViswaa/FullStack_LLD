const user = {
    name: 'Kohli',
    age: 34
}
// console.log(user)

const arr1 = [1, 2, 3]
// console.log(arr1);

const animal = {
    eats: true,
    sleep: true,
    walk() {
        console.log('the animal can walk')
    }
}

console.log(animal);

// const rabbit = {
//     areCute: true
// }

// rabbit.__proto__ = animal
// console.log(rabbit);

// console.log(rabbit.walk());

const herbivore = {
    eatsMeat: 'naah',
    __proto__: animal
}

const carnivore = {
    eatsMeat: 'yes',
    __proto__: animal
}

const rabbit = {
    canJump: true,
    __proto__: herbivore
}

const tiger = {
    canKill: true,
    __proto__: carnivore
}

// console.log(rabbit.eatsMeat); // naah

// console.log(tiger.eatsMeat); // yes

// console.log(rabbit.dance); // undefined


// console.log(rabbit.__proto__) // herbivore object

// console.log(rabbit.__proto__.__proto__) // animal object

// console.log(rabbit.__proto__.__proto__.__proto__) // Object object

// console.log(rabbit.__proto__.__proto__.__proto__.__proto__) // null


console.log(Object.keys(rabbit))

for (let key in rabbit) { // for .. in loop returns both self and inherited properties
    // console.log(key)
}

for (let key in rabbit) {
    if (rabbit.hasOwnProperty(key)) { // used to check whether an object has a particular property as a direct property or not
        console.log(key);
    }
}