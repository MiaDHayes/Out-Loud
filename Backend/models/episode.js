const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const Episode = new Schema(
    {
    title: { type: String, required: true },
    description: String,
    duration: Number,
    podcast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Podcast', required: true }]
    },
    {timestamps: true}
)

module.exports = mongoose.model('episode', Episode)