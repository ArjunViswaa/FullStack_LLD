const { register, login, getCurrentUser, ForgetPassword, ResetPassword } = require("../controllers/userController");
const express = require("express");
const auth = require("../middlewares/authMiddleware");

const userRouter = express.Router();

// Register a User...
userRouter.post("/register", register);

// Login an existing user...
userRouter.post("/login", login);

// Get the current User...
userRouter.get("/get-current-user", auth, getCurrentUser);

userRouter.post("/forgetPassword", ForgetPassword);

userRouter.post("/resetPassword", ResetPassword);

module.exports = userRouter;