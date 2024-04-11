const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const Category = new Schema(
    {
        // _id: {type: ObjectId},
        name: {type: String}
    },
    { timestamps: true }
)


module.exports = mongoose.model('category', Category)