const User = require('../models/user');


const getAllUsers = async (req,res) => {
    try {
        console.log("Request received to fetch all users")
        const user = await User.find()
        if (!user) {
            return res.status(400).json({message: 'User not found'})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal server error'})
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
        return res.status(404).json({message: 'User not found!'});
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

const createUser = async (req, res) => {
    try {
        const newUser = new User({
            fullName: req.body.fullName,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            birthDate: req.body.birthDate,
        })

        await newUser.save();
        return res.status(201).json({message: "User created successfully"});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Failed to create user"});
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id
    const updateFields = req.body
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true })
        if (!updatedUser) {
            return res.status(404).json({message: 'User unable to update'})
        }
        return res.status(200).json(updatedUser)
    } catch (error) {
        console.error(error)
        return res.status(500).send(error.message);
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.id
    try {
        const deletedUser = await User.findByIdAndDelete(userId)
        if (!deletedUser) {
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json(deletedUser)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}