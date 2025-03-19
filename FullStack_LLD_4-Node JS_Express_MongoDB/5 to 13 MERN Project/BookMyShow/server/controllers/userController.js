const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
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
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log("req received", req.body, user);
        
        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist. Please register.",
            });
        }

        if(req.body.password !== user.password) {
            return res.send({
                success: false,
                message: "Sorry! Invalid Password entered"
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log(token);

        res.send({
            success: true,
            message: "You've successfully logged in!",
            data: token
        });

    } catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "An error occured. Please try again later"
        });
    }
}

const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
        success: true,
        data: user
    });
}

module.exports = {
    register,
    login,
    getCurrentUser
}