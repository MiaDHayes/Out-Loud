const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const Playlist = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String},
        episodes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Episode', required: true}],
    },
    { timestamps: true }
)


module.exports = mongoose.model('playlist', Playlist)