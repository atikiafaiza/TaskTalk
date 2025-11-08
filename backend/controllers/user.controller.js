const User = require("../models/user.model");

const getAllUsers = async (req,res)=>{
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getOneUsersByReq = async (req,res)=>{
    try {
        const user_name = req.params.id;
        const user = await User.findOne({ user_name });
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getOneUser = async (user_name) => {
    try {
        return await User.findOne({ user_name: user_name });
    } catch (error) {
        return null;
    }
};

module.exports = { getAllUsers, getOneUsersByReq, getOneUser }