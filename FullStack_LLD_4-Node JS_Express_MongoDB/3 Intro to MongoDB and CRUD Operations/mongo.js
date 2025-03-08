const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3000;
const db_password = "hU4O2at0gNYmxmCR";

// connect to the database
const dbURL = `mongodb+srv://arjunviswaa:${db_password}@cluster0.4xxyxyg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbURL)
.then(() => {
    console.log("Connected to the database");
})
.catch((err) => {
    console.log(err);
})

// create a schema
const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: String,
        required: true
    },
    isInStock: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function() {
                return this.password === this.confirmPassword;
            },
            message: "Password and Confirm Password should be the same"
        }
    }
}, {timestamps: true});

// create a model
const productModel = mongoose.model("Product", productSchema);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// API to create a new product
app.post("/api/products", async(req, res) => {
    try {
        const product = await productModel.create({
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            isInStock: req.body.isInStock,
            category: req.body.category,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        });
        console.log(product);
        res.status(201).json({message: "Product created successfully"});
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});

// Get the list of products
app.get("/api/products", async(req, res) => {
    const products = await productModel.find();
    res.status(200).json(products);
});

// Get the list of products by category
app.get("/api/products/:category", async(req, res) => {
    const products = await(productModel.find({category: req.params.category}));
    res.status(200).json(products);
});

// Update a product by id
app.put("/api/products/:id", async(req, res) => {
    await productModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({message: "Product updated successfully"});
});

// Delete a product by id
app.delete("/api/products/:id", async(req, res) => {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Product deleted successfully"});
});