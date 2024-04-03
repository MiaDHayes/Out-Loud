const Playlist = require('../models/playlist');


const getAllPlaylists = async (req,res) => {
    try {
        const playlist = await Playlist.find()
        if (!playlist) {
            return res.status(400).json({message: 'Playlist not found'})
        }
        return res.status(200).json(playlist)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal server error'})
    }
}

const getPlaylistById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const playlists = await Playlist.findById(id);
        if (playlists) {
            return res.json(playlists);
        }
        return res.status(404).json({message: 'Playlist not found!'});
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

const createPlaylist = async (req, res) => {
    try {
        const newPlaylist = new Playlist({
            content: req.body.content
        })

        await newPlaylist.save();
        return res.status(201).json({message: "Playlist created successfully"});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Failed to create comment"});
    }
}

const updatePlaylist = async (req, res) => {
    const playlistId = req.params.id
    const updateFields = req.body
    try {
        const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, updateFields, { new: true })
        if (!updatedPlaylist) {
            return res.status(404).json({message: 'Playlist unable to update'})
        }
        return res.status(200).json(updatedPlaylist)
    } catch (error) {
        console.error(error)
        return res.status(500).send(error.message);
    }
}

const deletePlaylist = async (req, res) => {
    const playlistId = req.params.id
    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId)
        if (!deletedPlaylist) {
            return res.status(404).json({message: "Playlist not found"});
        }
        return res.status(200).json(deletedPlaylist)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    getAllPlaylists,
    getPlaylistById,
    createPlaylist,
    updatePlaylist,
    deletePlaylist
}