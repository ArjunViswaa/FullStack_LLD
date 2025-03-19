const { register, login, getCurrentUser } = require("../controllers/userController");
const express = require("express");
const auth = require("../middlewares/authMiddleware");

const userRouter = express.Router();

// Register a User...
userRouter.post("/register", register);

// Login an existing user...
userRouter.post("/login", login);

// Get the current User...
userRouter.get("/get-current-user", auth, getCurrentUser);

module.exports = userRouter;