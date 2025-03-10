const ProductModel = require("../models/product");

const createProduct = async(req, res) => {
    try {
        const product = await ProductModel.create({
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            isInStock: req.body.isInStock,
            category: req.body.category,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        });
        res.status(201).json({message: "Product created successfully"});
    } catch(err) {
        res.status(400).json({Errmessage: err.message});
    }
};

const getAllProducts = async(req, res) => {
    const products = await ProductModel.find();
    res.status(200).json(products);
};

const getProductsByCategory = async(req, res) => {
    const products = await(ProductModel.find({category: req.params.category}));
    res.status(200).json(products);
};

const updateProductById = async(req, res) => {
    await ProductModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({message: "Product updated successfully"});
};

const deleteProduct = async(req, res) => {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Product deleted successfully"});
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductsByCategory,
    updateProductById,
    deleteProduct
};