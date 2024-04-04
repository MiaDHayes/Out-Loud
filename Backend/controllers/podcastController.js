const Podcast = require('../models/podcast')


const getAllPodcast = async (req,res) => {
    try {
        const podcastId = req.params.podcastId
        const podcast = await Podcast.find()
        if (!podcast) {
            return res.status(400).json({message: 'Podcast not found'})
        }
        return res.status(200).json(podcast)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal server error'});
    }
}

const getPodcastById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const podcast = await Podcast.findById(id);
        if (podcast) {
            return res.json(podcast);
        }
        return res.status(404).json({message: 'Podcast not found!'});
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

const createPodcast = async (req, res) => {
    try {
        const {title, description} = req.body
        const {podcastFile, coverPhoto} = req.files
        
        console.log('Title:', title)
        console.log('Description:', description)
        console.log('Podcast File:', podcastFile)
        console.log('Cover Photo:', coverPhoto)

        const newPodcast = new Podcast({title, description, 
            podcastFile: podcastFile[0].path, 
            coverPhoto: coverPhoto[0].path, 
        })
        await newPodcast.save();
        return res.status(201).json({message: "Podcast created successfully"});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Failed to create podcast"});
    }
}

const updatePodcast = async (req, res) => {
    const podcastId = req.params.id
    const updateFields = req.body
    try {
        const updatedPodcast = await Podcast.findByIdAndUpdate(podcastId, updateFields, { new: true })
        if (!updatedPodcast) {
            return res.status(404).json({message: 'Podcast unable to update'})
        }
        return res.status(200).json(updatedPodcast)
    } catch (error) {
        console.error(error)
        return res.status(500).send(error.message);
    }
}

const deletePodcast = async (req, res) => {
    const podcastId = req.params.id
    try {
        const deletedPodcast = await Podcast.findByIdAndDelete(podcastId)
        if (!deletedPodcast) {
            return res.status(404).json({message: "Podcast not found"});
        }
        return res.status(200).json(deletedPodcast)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    getAllPodcast,
    getPodcastById,
    createPodcast,
    updatePodcast,
    deletePodcast
}