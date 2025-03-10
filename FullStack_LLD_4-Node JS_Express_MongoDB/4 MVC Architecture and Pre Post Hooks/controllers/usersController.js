const UserModel = require("../models/users");

const createUser = async (req, res) => {
    const {name, email} = req.body;
    try {
        const user = await (UserModel.create({name, email}));
        res.status(201).json(user);
    } catch(e) {
        res.status(400).json({error: e.message});
    }
}

module.exports = createUser;