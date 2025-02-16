let myRadiusArray = [2, 3, 4, 5, 8]

let calculateArea = (radiusArr) => {
    let result = [];
    for (let i = 0; i < radiusArr.length; i++) {
        result.push(3.14 * radiusArr[i] * radiusArr[i]);
    }
    return result;
}

// let finalAreas = calculateArea(myRadiusArray);
// console.log(`This is the Areas array -> ${finalAreas}`)

let calculateCircumference = (radiusArr) => {
    let result = [];
    for (let i = 0; i < radiusArr.length; i++) {
        result.push(2 * Math.PI * radiusArr[i]);
    }
    return result;
}

// let finalCircums = calculateArea(myRadiusArray);
// console.log(`This is the Circumference array -> ${finalCircums}`)

let calculateDiameter = (radiusArr) => {
    let result = [];
    for (let i = 0; i < radiusArr.length; i++) {
        result.push(2 * radiusArr[i]);
    }
    return result;
}

// let finalDiameters = calculateArea(myRadiusArray);
// console.log(`This is the Diameters array -> ${finalDiameters}`)

// Using higher order functions : 
calculateArea = (radius) => {
    return Math.PI * radius * radius;
}

calculateCircumference = (radius) => {
    return 2 * Math.PI * radius;
}

calculateDiameter = (radius) => {
    return 2 * radius;
}

let calculate = (radiusArr, logic) => {
    let result = [];
    for (let i = 0; i < radiusArr.length; i++) {
        result.push(logic(radiusArr[i]))
    }
    return result;
}

let finalAreas = calculate(myRadiusArray, calculateArea)
console.log('This is area array => ', finalAreas)

let finalCircumferences = calculate(myRadiusArray, calculateCircumference)
console.log('This is Circumference array =>', finalCircumferences)

let finalDiameter = calculate(myRadiusArray, calculateDiameter)
console.log('This is Diameter array =>', finalDiameter)