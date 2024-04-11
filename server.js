const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./Backend/db/index')
const multer = require('multer');
const fs = require('fs')
const path = require('path')
//Session-based storage --->
const session = require('express-session')
// <------------
const categoryController = require('./Backend/controllers/categoryController')
const favoriteController = require('./Backend/controllers/favoriteController')
const audioFileController = require('./Backend/controllers/audioFileController')
const podcastController = require('./Backend/controllers/podcastController')
const userController =  require('./Backend/controllers/userController')
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
        cb(null, 'uploads/podcastFiles/')
      } else if (file.fieldname === 'coverPhoto') {
        cb(null, 'uploads/coverPhotos/')
      } else {
        cb(new Error('Invalid file fieldname'))
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) // Generate a unique filename for the uploaded file
    }
  })
  
  const upload = multer({ storage: storage })
  

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.mp3','webm')) {
      res.setHeader('Content-Type', 'audio/mpeg');
    }
  }
}));



//Middleware
app.use(cors())
app.use(bodyParser.json())



app.use(session({
  secret: 'theworldisa_sad_and_shittyplace_forregular_degularpeople_likeme',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true}
}))

//Routes for User
console.log("Route for /users registered")
app.get('/users', userController.getAllUsers)
app.get('/user/:id', userController.getUserById)
app.post('/user', userController.createUser)
app.put('/user/:id', userController.updateUser)
app.delete('/user/:id', userController.deleteUser)

//Route for audio upload
app.post('/upload-audio', audioFileController.uploadAudio)

//Routes for Favorites
app.get('/favorites', favoriteController.getAllFavorites)
app.get('/favorite/:id', favoriteController.getFavoriteById)
app.post('/addfavorite', favoriteController.createFavorite)
app.delete('/favorite/:id', favoriteController.deleteFavorite)

//Routes for Categories
app.get('/categories', categoryController.getAllCategories)
app.get('/category/:id', categoryController.getCategoryById)
app.post('/category', categoryController.createCategory)
app.put('/category/:id', categoryController.updateCategory)
app.delete('/category/:id', categoryController.deleteCategory)

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
]), podcastController.createPodcast)
app.put('/podcast/:id', podcastController.updatePodcast)
app.delete('/podcast/:id', podcastController.deletePodcast)


app.get('*', (req, res) => {res.send('404 not found')})