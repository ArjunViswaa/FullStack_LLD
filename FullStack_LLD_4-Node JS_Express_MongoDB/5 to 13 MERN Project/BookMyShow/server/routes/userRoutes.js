const express = require("express");
const User = require("../models/userModel");

const userRouter = express.Router();

// Register a User...
userRouter.post("/register", async (req, res) => {
    try {
        const isExistingUser = await User.findOne({ email: req.body.email });
        if (isExistingUser) {
            return res.send({
                success: false,
                message: "Email already exists"
            })
        }

        const newUser = new User(req.body);
        await newUser.save();

        res.send({
            success: true,
            message: "Registration Successful, Please login"
        });
    } catch (err) {
        console.log(err);
    }
});

// Login an existing user...
userRouter.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist. Please register.",
            });
        }

        // Simplified password validation (assuming passwords are stored in plain text, which is not recommended)
        if(req.body.password !== user.password) {
            return res.send({
                success: false,
                message: "Sorry! Invalid Password entered"
            });
        }

        res.send({
            success: true,
            message: "You've successfully logged in!",
        });

    } catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "An error occured. Please try again later"
        });
    }
})

module.exports = userRouter;