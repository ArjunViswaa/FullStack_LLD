// Define our toys as a JavaScript object
var toys = {
    toy1: { name: "Teddy Bear", color: "Brown" },
    toy2: { name: "Race Car", color: "Red" },
    toy3: { name: "Doll", color: "Pink" },
};

// Now Here this is in Javascript object Format and in
// this format data cannot be sent over the internet as this
// is not universally understood by the data transfer protocols
// Pack our toys into a box (convert our toys object into a JSON string)
var toysJSONString = JSON.stringify(toys);
console.log("Packed Toys:", toysJSONString);

// Here We have converted the javascript object into JSON string now this is understood by the protocolos

// Now, let's say this JSON string is sent over the internet.
// On the other side, we receive this packed box of toys as a JSON string.

// Now as we are recieving a JSON string , so while writing javascript code we will not be able to apply object
// properties in a JSON string , so now to convert the string again to object we will parse it
// Unpack our toys from the box (parse the JSON string back into a JavaScript object)
var unpackedToys = JSON.parse(toysJSONString);
console.log("Unpacked Toys:", unpackedToys);

// Now, 'unpackedToys' is a JavaScript object with our toys,
// and we can access and work with them like before.
console.log("Let's play with the:", unpackedToys.toy1.name); // Accessing the Teddy Bear