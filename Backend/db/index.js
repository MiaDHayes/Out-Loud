const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5')
    .then(() => {
        console.log('Successfully connected to MongoDB Purr.')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })



const db = mongoose.connection

module.exports = db