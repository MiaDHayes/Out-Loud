const { Podcast } = require('../models/podcast');

const getAllPodcast = async (req,res) => {
    try {
        const podcasts = await Podcast.find()
        res.json(podcasts)
    } catch (error) {
        return res.status(500).send(error.message);
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
        return res.status(404).send('Podcast not found!');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createPodcast = async (req, res) => {
    try {
        const podcast = await new Podcast(req.body);
        await podcast.save();
        return res.status(201).json({podcast,});

    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
}

const updatePodcast = async (req, res) => {
    try {
        let { id } = req.params;
        let podcasts = await Podcast.findByIdAndUpdate(id, req.body, { new: true })
        if (podcasts) {
            return res.status(200).json(podcasts)
        }
        throw new Error("Podcasts not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deletePodcast = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Podcast.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Podcast deleted");
        }
        throw new Error("Podcast not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllPodcast,
    getPodcastById,
    createPodcast,
    updatePodcast,
    deletePodcast
}