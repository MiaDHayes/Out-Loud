const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const Playlist = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String},
        episodes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Episode', required: true}],
        podcasts: [{type: Schema.Types.ObjectId, ref: 'Podcast'}]
    },
    { timestamps: true }
)


module.exports = mongoose.model('playlist', Playlist)