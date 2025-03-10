const mongoose = require("mongoose");

// Define a schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdAt: Date,
    updatedAt: Date
});

// Define a pre hook for timestamp setting
userSchema.pre("save", function(next) {
    const now = new Date();
    this.updatedAt = now;
    if(!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

// Define a post hook for logging
userSchema.post("save", function(doc, next) {
    console.log(`User :${doc.name} has been saved with ID : ${doc._id}`);
    next();
});

// Create a model with this userSchema
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;