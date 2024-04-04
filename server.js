const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./Backend/db/index')
const multer = require('multer');
const fs = require('fs')
// const Podcast = require('./Backend/models/podcast')
const audioFileController = require('./Backend/controllers/audioFileController')
const podcastController = require('./Backend/controllers/podcastController')
const userController =  require('./Backend/controllers/userController')
const commentController = require('./Backend/controllers/commentController')
const episodeController = require('./Backend/controllers/episodeController')
const playlistController = require('./Backend/controllers/playlistController')


const app = express()
const PORT = process.env.PORT || 3005

//Function to create uploads directories
const createUploadsDirectories = () => {
  const podcastFilesDir = 'uploads/podcastFiles'
  const coverPhotosDir = 'uploads/coverPhotos'

  if (!fs.existsSync(podcastFilesDir)) {
    fs.mkdirSync(podcastFilesDir, {recursive: true})
  }
  if (!fs.existsSync(coverPhotosDir)) {
    fs.mkdirSync(coverPhotosDir, {recursive: true})
  }
}
createUploadsDirectories()


//Multer for uploading files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === 'podcastFile') {
        cb(null, 'uploads/podcastFiles/') // Specify the destination folder for podcast files
      } else if (file.fieldname === 'coverPhoto') {
        cb(null, 'uploads/coverPhotos/') // Specify the destination folder for cover photos
      } else {
        cb(new Error('Invalid file fieldname'))
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) // Generate a unique filename for the uploaded file
    }
  })
  
  const upload = multer({ storage: storage })
  

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

//Route for audio upload
app.post('/upload-audio', audioFileController.uploadAudio)

//Routes for Comments
app.get('/comments', commentController.getAllComments)
app.get('/comment/:id', commentController.getCommentById)
app.post('/comment', commentController.createComment)
app.put('/comment/:id', commentController.updateComment)
app.delete('/comment/:id', commentController.deleteComment)

//Routes for Episodes
app.get('/episodes', episodeController.getAllEpisodes)
app.get('/episode/:id', episodeController.getEpisodeById)
app.post('/episode', episodeController.createEpisode)
app.delete('/episode/:id', episodeController.deleteEpisode)

//Routes for Playlists
app.get('/playlists', playlistController.getAllPlaylists)
app.get('/playlist/:id', playlistController.getPlaylistById)
app.post('/playlist', playlistController.createPlaylist)
app.put('/playlist/:id', playlistController.updatePlaylist)
app.delete('/playlist/:id', playlistController.deletePlaylist)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
app.get('/', (req, res) => res.send('Welcome Home'))

//Routes for Podcasts
app.get('/podcasts', podcastController.getAllPodcast)
app.get('/podcast/:id', podcastController.getPodcastById)
app.post('/podcast', upload.fields([
    {name: 'podcastFile', maxCount: 1},
    {name: 'coverPhoto', maxCount: 1},
    // {name: 'audioFile', maxCount: 4}
]), podcastController.createPodcast)
app.put('/podcast/:id', podcastController.updatePodcast)
app.delete('/podcast/:id', podcastController.deletePodcast)


app.get('*', (req, res) => {res.send('404 not found')})