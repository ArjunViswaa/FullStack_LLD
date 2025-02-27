Array.prototype.myFilter = function (callback, thisArg) {
    // Step 1: Throw a TypeError if 'callback' is not a function
    if (typeof callback != "function") {
        throw new TypeError(callback + "is not a function");
    }

    // Step 2: Create a new empty array for the results
    let result = [];

    // Step 3: Iterate over the array
    for (let i = 0; i < this.length; i++) {
        // Check if the index exists in the array to handle sparse arrays
        if (i in this) {
            // Define the context for the callback
            let context = thisArg ? thisArg : this;

            // Step 4: Execute 'callback' for each element, considering 'thisArg'
            // If 'callback' returns true, push the current element to 'result'
            if (callback.call(context, this[i], i, this)) {
                result.push(this[i]);
            }
        }
    }
    
    // Step 5: Return the new array
    return result;
}

// Usage...
var numbers = [1, 2, 3, 4, 5];
var evenNumbers = numbers.myFilter(function (number) {
    return number % 2 === 0;
});

console.log(evenNumbers); // Output: [2, 4]