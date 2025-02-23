function Car(make, model) {
    this.make = make;
    this.model = model;
    this.displayInfo = function () {
        console.log(`Car: ${this.make} ${this.model}`);
    };
}

const myCar = new Car("Toyota", "Corolla");
myCar.displayInfo(); // Outputs: Car: Toyota Corolla