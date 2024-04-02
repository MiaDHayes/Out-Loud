const { User } = require('../models');

const getAllUser = async (req,res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const users = await User.findById(id);
        if (users) {
            return res.json(users);
        }
        return res.status(404).send('Users are not found!');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createUser = async (req, res) => {
    try {
        const users = await new User(req.body);
        await users.save();
        return res.status(201).json({users,});

    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
}

const updateUser = async (req, res) => {
    try {
        let { id } = req.params;
        let users = await User.findByIdAndUpdate(id, req.body, { new: true })
        if (users) {
            return res.status(200).json(users)
        }
        throw new Error("Users not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("User deleted");
        }
        throw new Error("User not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}