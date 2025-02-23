// Scenario 1: Console.log(this)
console.log("Scenario 1:");
console.log(this); // Output: {}


// Scenario 2: Console.log(this) -> fn = global object
console.log("Scenario 2:");
function fnGlobal() {
    console.log(this); // Output: global object
}
fnGlobal();


// Scenario 3: this -> obj -> fn = object itself
console.log("Scenario 3:");
var obj = {
    fn: function () {
        console.log(this); // Output: obj object
    }
};
obj.fn();


// Scenario 4: this -> obj -> fn -> fn = global object
console.log("Scenario 4:");
var obj2 = {
    fn: function () {
        console.log(this); // Output: obj2 object
        var nestedFn = function () {
            console.log(this); // Output: global object
        };
        nestedFn();
    }
};
obj2.fn();