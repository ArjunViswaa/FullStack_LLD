Array.prototype.myReduce = function (callback, initialValue) {
    // Step 1: Throw a TypeError if 'callback' is not a function
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    // Step 2: Handle empty array with no initial value case
    if (this.length === 0 && arguments.length === 1) {
        throw new TypeError('Reduce of empty array with no initial value');
    }

    // Step 3: Set the initial index and accumulator
    var accumulator = arguments.length >= 2 ? initialValue : this[0];
    var startIndex = arguments.length >= 2 ? 0 : 1;

    // Step 4: Iterate over the array
    for (let i = startIndex; i < this.length; i++) {
        // Check if the index exists in the array to handle sparse arrays
        if (i in this) {
            // Step 5: Update the accumulator
            accumulator = callback(accumulator, this[i], i, this);
        }
    }

    // Step 6: Return the accumulated value
    return accumulator;
}

const arr = [1, 2, 3, 4, 5]
const sum = arr.myReduce((acc, curr) => acc + curr, 0)
console.log(sum) // 15