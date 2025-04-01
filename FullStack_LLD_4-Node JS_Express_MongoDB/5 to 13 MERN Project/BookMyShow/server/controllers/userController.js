const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const EmailHelper = require("../utils/EmailHelper");

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

        if (req.body.password !== user.password) {
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

    } catch (err) {
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

const ForgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (email == undefined) {
            return res.status(401).json({
                status: "failure",
                message: "Please enter the email for forget Password",
            });
        }
        let user = await User.findOne({ email: email });
        if (user == null) {
            return res.status(404).json({
                status: false,
                message: "user not found",
            });
        }
        // 90000 - 99999
        if (user?.otp && Date.now() < user?.otpExpiry) {
            return res.status(401).json({
                status: false,
                message: "otp exisit, check your mail",
            });
        }
        const otp = Math.floor(Math.random() * 10000 + 90000);
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();
        await EmailHelper("otp.html", email, {
            name: user.name,
            otp: user.otp,
        });
        res.status(200).json({
            success: true,
            message: "otp has been sent",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

const ResetPassword = async (req, res) => {
    try {
        const { password, otp } = req.body;
        if (password == undefined || otp == undefined) {
            return res.status(401).json({
                success: false,
                message: "invalid request",
            });
        }
        const user = await User.findOne({ otp: otp });
        if (user == null) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        if (Date.now() > user.otpExpiry) {
            return res.status(401).json({
                success: false,
                message: "otp expired",
            });
        }
        user.password = password;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        res.status(200).json({
            success: true,
            message: "password reset successfully",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    register,
    login,
    getCurrentUser,
    ForgetPassword,
    ResetPassword
}