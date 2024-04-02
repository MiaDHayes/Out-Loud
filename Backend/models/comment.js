const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const Comment = new Schema(
    {
        content: {type: String, required: true},
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        // post: {type: mongoose.Schema.Types.ObjectId, ref: 'Podcast', required: true},
    },
    { timestamps: true }
)


module.exports = mongoose.model('comment', Comment)