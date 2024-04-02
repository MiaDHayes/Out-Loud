const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const User = new Schema(
    {
        fullName: {type: String, required: true},
        username: {type: String, required: true},
        password: {type: String, required: true},
        email: {type: String, required: true},
        phoneNumber: {type: Number},
        birthDate: {type: Date}
    },
    { timestamps: true }
)

module.exports = mongoose.model('user', User)