//Single Podcast Episode

const Episode = require('../models/episode');


const getAllEpisodes = async (req,res) => {
    try {
        const episodes = await Episode.find()
        if (!episodes || episodes.length === 0) {
            return res.status(400).json({message: 'Episode not found'})
        }
        return res.status(200).json(episodes)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal server error'})
    }
}

const getEpisodeById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const episodes = await Episode.findById(id);
        if (episodes) {
            return res.json(episodes);
        }
        return res.status(404).json({message: 'Episode not found!'});
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

const createEpisode = async (req, res) => {
    try {
        const newEpisode = new Episode(req.body)
        await newEpisode.save();
        return res.status(201).json({message: "Episode created successfully"});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Failed to create episode"});
    }
}

const deleteEpisode = async (req, res) => {
    const episodeId = req.params.id
    try {
        const deletedEpisode = await Episode.findByIdAndDelete(episodeId)
        if (!deletedEpisode) {
            return res.status(404).json({message: "Episode not found"});
        }
        return res.status(200).json(deletedEpisode)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    getAllEpisodes,
    getEpisodeById,
    createEpisode,
    deleteEpisode
}