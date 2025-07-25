const path = require("path");
const fs = require("fs");

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        const p = path.join(path.dirname(process.mainModule.filename), "data", "products.json");
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if(!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll() {
        const products = fs.readFile
        return products;
    }
}