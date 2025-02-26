const alice = {
    name: 'Alice',
    age: 30,
    introduce: function () {
        // console.log(this)
        console.log(`My name is ${this.name} and I am ${this.age} years old.`);
    }
};

const ben = {
    name: 'Ben',
    age: 20,
    introduce: function () {
        // console.log(this)
        console.log(`My name is ${this.name} and I am ${this.age} years old.`);
    }
};

// Get the button element from the HTML
const button = document.getElementById('introduceButton');

// Add an event listener to the button
// We use bind to ensure 'this' inside introduce refers to 'alice'
// button.addEventListener('click', alice.introduce);
const boundIntroduceAlice = ben.introduce.bind(alice); // O/P : My name is Alice and I am 30 years old.
const boundIntroduceBen = alice.introduce.bind(ben); // O/P : My name is Ben and I am 20 years old.
button.addEventListener('click', boundIntroduceBen);