function flattenArray(arr) {
    return arr.reduce((flatArray, item) => {
        if (Array.isArray(item)) {
            flatArray.push(...flattenArray(item)); // Recursively flatten nested arrays
        } else {
            flatArray.push(item); // If it's not an array, push it to the flatArray
        }
        return flatArray;
    }, []);
}

// Example nested array
const nestedArray = [1, [2, 3], [4, [5, 6]]];

// Flatten the nested array
const flattenedArray = flattenArray(nestedArray);
console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]
