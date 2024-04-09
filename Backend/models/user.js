const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const User = new Schema(
    {
        fullName: {type: String, required: false},
        username: {type: String, required: true},
        password: {type: String, required: true},
        confirmPassword: {type: String},
        email: {type: String, required: false},
        phoneNumber: {type: Number},
        birthDate: {type: Date},
        podcast: [{type: Schema.Types.ObjectId, ref: 'Podcast'}],
        // episodes: [{type: Schema.Types.ObjectId, ref: 'Episode'}],
        // playlists: [{type: Schema.Types.ObjectId, ref: 'Playlist'}]
    },
    { timestamps: true }
)

module.exports = mongoose.model('user', User)