const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./Backend/db/index')
const Podcast = require('./Backend/models/podcast')
const podcastController = require('./Backend/controllers/podcastController')
const userController =  require('./Backend/controllers/userController')


const app = express()
const PORT = process.env.PORT || 3005

//Middleware
app.use(cors())
app.use(bodyParser.json())

//Routes for User
console.log("Route for /users registered")
app.get('/users', userController.getAllUsers)
app.get('/user/:id', userController.getUserById)
app.post('/user', userController.createUser)
app.put('/user/:id', userController.updateUser)
app.delete('/user/:id', userController.deleteUser)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
app.get('/', (req, res) => res.send('Welcome Home'))

//Routes for Podcasts
app.get('/podcasts', podcastController.getAllPodcast)
app.get('/podcast/:id', podcastController.getPodcastById)
app.post('/podcast', podcastController.createPodcast)
app.put('/podcast/:id', podcastController.updatePodcast)
app.delete('/podcast/:id', podcastController.deletePodcast)
app.get('*', (req, res) => {res.send('404 not found')})


