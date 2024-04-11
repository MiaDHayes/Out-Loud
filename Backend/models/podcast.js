const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const Podcast = new Schema(
    {   
        username: [{type: Schema.Types.ObjectId, ref: 'User'}],
        title: {type: String},
        description: {type: String},
        podcastFile: {type: String},
        coverPhoto: {type: String},
        episodes: [{type: Schema.Types.ObjectId, ref: 'Episode'}]
    },
    { timestamps: true }
)


module.exports = mongoose.model('podcast', Podcast)