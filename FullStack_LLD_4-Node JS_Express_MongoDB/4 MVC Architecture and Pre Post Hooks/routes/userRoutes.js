const express = require('express');
const userRoute = express.Router();

const createUser = require('../controllers/usersController');

userRoute.post("/", createUser);

module.exports = userRoute;