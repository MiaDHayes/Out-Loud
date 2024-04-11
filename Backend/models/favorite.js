const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const Favorite = new Schema(
    {   
        userId: [{type: Schema.Types.ObjectId, ref: 'User'}],
        sessionId: {type: String},
        podcastId: [{type: Schema.Types.ObjectId, ref: 'Podcast'}]
    },
    { timestamps: true }
)


module.exports = mongoose.model('favorite', Favorite)