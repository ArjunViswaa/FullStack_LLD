function Pizza(toppings, size, crustType) {
    this.toppings = toppings;
    this.size = size;
    this.crustType = crustType;
    this.describe = function () {
        console.log(`A ${this.size} pizza with ${this.toppings.join(", ")} on a ${this.crustType} crust.`);
    };
}

const customerOrder1 = new Pizza(["cheese", "pepperoni"], "medium", "thin");
const customerOrder2 = new Pizza(["veggies", "pepperoni"], "small", "thick");

customerOrder1.describe(); // Output: A medium pizza with cheese, pepperoni on a thin crust.
customerOrder2.describe(); // Output: A small pizza with veggies, pepperoni on a thick crust.