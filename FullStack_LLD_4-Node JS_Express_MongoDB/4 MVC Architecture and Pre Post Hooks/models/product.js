const mongoose = require("mongoose");

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
        type: [String],
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
            validator: function () {
                return this.password === this.confirmPassword;
            },
            message: "Password and Confirm Password should be the same"
        }
    }
}, { timestamps: true });

const validCategories = ["Mobiles & Electronics", "Fashion", "Grocery", "Food & Beverages"];
productSchema.pre("save", function (next) {
    const invalidCategories = this.category.filter((category) => {
        return !validCategories.includes(category);
    });
    if (invalidCategories.length > 0) {
        return next(
            new Error(`Invalid categories: ${invalidCategories.join(",")}`)
        );
    } else {
        next();
    }
});

// create a model
const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;