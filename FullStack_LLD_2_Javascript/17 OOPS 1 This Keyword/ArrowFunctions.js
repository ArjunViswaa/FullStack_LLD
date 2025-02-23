// Traditional Function Expression
const add1 = function (x, y) {
    const a = 10;
    const val = a + x + y;
    console.log(val);
    return x + y;
};

// Arrow function syntax same logic
const add2 = (x, y) => {
    const a = 10;
    const val = a + x + y;
    console.log(val);
    return x + y;
};

const double = function (x) {
    return x * 2;
}

// Arrow function shorthand...
const doubl2q = x => x * 2;

// Arrow function this keyword handling
const joey = {
    nickName: "Joey",
    eventuallySayName: function () {
        function actuallySayName() {
            console.log(`first: ${this.nickName}`);
        }
        // Create an arrow function
        const actuallySayNameWithArrow = () => {
            console.log(`second: ${this.nickName}`); // Joe
        };
        // Call that in 1 second
        setTimeout(actuallySayName, 1000); // undefined
        setTimeout(actuallySayNameWithArrow, 1000); // Joey
    },
    arrow: () => console.log(`arrow: ${this.nickName}`),
    regular: function () {
        console.log(`regular: ${this.nickName}`); // Joey
    },
};

// window.nickName = "Ayushee";
joey.arrow(); // undefined
joey.regular(); // Joey
joey.eventuallySayName(); // undefined     Joey