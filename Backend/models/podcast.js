const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const Podcast = new Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        author: {type: String, required: false},
        coverImageUrl: {type: Date, required: false},
        // episode: [{type: Schema.Types.ObjectId, ref: 'Episode'}]
    },
    { timestamps: true }
)

module.exports = Podcast