const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Change the destination directory as needed

// Route handler for handling audio file uploads
const uploadAudio = upload.single('audioFile');
const handleAudioUpload = (req, res) => {
  // Handle the uploaded file here
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Process the uploaded file (e.g., save it to storage, database, etc.)
  // Respond with success message or any relevant data
  return res.status(200).json({ message: 'File uploaded successfully', filename: file.filename });
}

module.exports = { uploadAudio : handleAudioUpload };
