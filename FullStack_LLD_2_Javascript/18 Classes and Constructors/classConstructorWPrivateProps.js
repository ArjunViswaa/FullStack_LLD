class Pizza {
    static totalPizzasMade = 0;  // Static property to keep count
    #orderNo;; // Private property
    #toppings;; // Private property
    #size;; // Private property
    #crustType;; // Private property

    constructor(order, toppings, size, crustType) {
        this.#orderNo = order;
        this.#toppings = toppings;
        this.#size = size;
        this.#crustType = crustType;
        Pizza.totalPizzasMade++; // Increment the count each time a new pizza is made
    }

    describe() {
        console.log(`Order.No: ${this.#orderNo} - A ${this.#size} pizza with ${this.#toppings.join(", ")} on a ${this.#crustType} crust.`);
    }

    // Static method
    static calculateTotalPizzasMade() {
        console.log(`Total pizzas made: ${Pizza.totalPizzasMade}`);
    }

}

var customerOrder1 = new Pizza(1, ["cheese", "pepperoni"], "medium", "thin");
var customerOrder2 = new Pizza(2, ["veggies", "pepperoni"], "small", "thick");

customerOrder1.describe(); // Output: A medium pizza with cheese, pepperoni on a thin crust.
customerOrder2.describe(); // Output should be: A small pizza with veggies, pepperoni on a thick crust.


/* Inheritance and super keyword in JS ES6 */
class StuffedCrustPizza extends Pizza {
    #stuffingType; // Private property
    constructor(order, toppings, size, crustType, stuffingType) {
        super(order, toppings, size, crustType); // Call the parent class constructor with super
        this.#stuffingType = stuffingType; // New property specific to StuffedCrustPizza
    }

    describeStuffing() {
        console.log(`This pizza has ${this.#stuffingType} stuffing in the crust.`);
    }

    // Overriding the describe method
    describe() {
        super.describe(); // Call the describe method from the parent class
        this.describeStuffing(); // Additional description for the stuffing
    }
}

const specialOrder = new StuffedCrustPizza(3, ['cheese', 'mushrooms'], 'large', 'thick', 'cheese and tikki');
specialOrder.describe();

console.log(specialOrder.stuffingType); // undefined - private variables are not accessible from outside the class
console.log(customerOrder1.orderNo); // undefined

Pizza.calculateTotalPizzasMade(); // Output: Total pizzas made: 3