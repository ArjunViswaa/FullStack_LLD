const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        enum: ["user", "admin", "partner"],
        required: true,
        default: 'user'
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    }
}, { timestamps: true });

const userModel = mongoose.model("bmsusers", userSchema);

module.exports = userModel;