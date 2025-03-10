const express = require("express");

const productRouter = express.Router();
const {
    getAllProducts,
    getProductsByCategory,
    updateProductById,
    createProduct,
    deleteProduct,
} = require("../controllers/productController");

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductsByCategory);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProductById);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;