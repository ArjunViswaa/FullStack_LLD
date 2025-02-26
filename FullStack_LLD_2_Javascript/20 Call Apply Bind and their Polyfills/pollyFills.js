// Call Pollyfill...
Function.prototype.myCall = function (context = {}, ...args) {
    if (typeof this !== 'function') {
        throw new Error(this + 'Is not callable')
    }

    context.myFunction = this;
    context.myFunction(...args);
}

// Apply Pollyfill...
Function.prototype.myApply = function (context = {}, argsArr = []) {
    if (typeof this !== 'function') {
        throw new Error(this + 'Is not callable')
    }

    if (!Array.isArray(argsArr)) {
        throw new Error(this + "We need an array for args");
    }

    context.myFunction = this;
    context.myFunction(...argsArr)
}

// Bind Polyfill...
Function.prototype.myBind = function (context, ...boundArgs) {
    if (typeof this !== 'function') {
        throw new Error(this + ' is not callable');
    }

    const targetFunction = this;
    
    return function (...args) {
        return targetFunction.myApply(context, [...boundArgs, ...args]);
    };
}


let car = {
    name: "Mercedes",
    color: "White",
};

function buyCar(price, year) {
    console.log(`I bought a ${this.color} ${this.name} for ${price}, ${year} Model`);
}

buyCar.myCall(car, "$ 50000", "2008");

buyCar.myApply(car, ["$ 1000000", "2013"]);

const buycarMercedes = buyCar.bind(car, "$ 3000000");
buycarMercedes("2020");