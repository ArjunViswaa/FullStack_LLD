const arr = [1, 2, 4];
const result = arr.map((item) => item * 2);
console.log(result);

// myMap pollyfill implementation...
Array.prototype.myMap = function (callback, thisArg) {
    // Step 1: Throw a TypeError if 'callback' is not a function
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    // Step 2: Create a new empty array for the results
    const val = new Array(this.length);

    // Step 3: Iterate over the array
    for (let i = 0; i < this.length; i++) {
        // Check if the index exists in the array to handle sparse arrays
        if (i in this) {
            // Step 4: Execute 'callback' for each element, considering 'thisArg'
            // Use a ternary operator to check if 'thisArg' is provided
            var context = thisArg ? thisArg : this;
            var mappedValue = callback.call(context, this[i], i, this);
            // Step 5: Push the result of the callback into the 'result' array
            val[i] = mappedValue;
        }
    }

    // Step 6: Return the new array
    return val;
}


const myResult = arr.myMap((item) => item * 2);
console.log(myResult);

const thisArg = { multiplier: 2 };
const ans = [1, 2, 3].map(function (element) {
    return element * this.multiplier;
}, thisArg); // `this` in the callback is set to `thisArg`

console.log(ans); // [2, 4, 6]