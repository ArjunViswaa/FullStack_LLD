// Scenario 1: Console.log(this)
console.log("Scenario 1:");
console.log(this); // Output: Window object


// Scenario 2: Console.log(this) -> fn = Window object
console.log("Scenario 2:");
function fnGlobal() {
    console.log(this); // Output: Window object
}
fnGlobal();


// Scenario 3: this -> obj -> fn = object itself
console.log("Scenario 3:");
var obj = {
    prop: 'I am a property',
    fn: function () {
        console.log(this.prop); // Output: 'I am a property'
    }
};
obj.fn();


// Scenario 4: this -> obj -> fn -> fn = global object
console.log("Scenario 4:");
var obj2 = {
    prop: 'I am a property',
    fn: function () {
        console.log(this); // Output: obj2 object
        var nestedFn = function () {
            console.log(this); // Output: Window object
        };
        nestedFn();
    }
};
obj2.fn();