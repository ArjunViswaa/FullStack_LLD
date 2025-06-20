const express = require("express");
const path = require("path");

const router = express.Router();
const products = [];

router.get("/add-product", (req, res, next) => {
    // res.send("<form action='/admin/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>");
    res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});

router.post("/product", (req, res, next) => {
    // console.log(req.body);
    products.push({ title: req.body.title });
    console.log("prods", products);
    res.redirect("/");
});

exports.routes = router;
exports.products = products;