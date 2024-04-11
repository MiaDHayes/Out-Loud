//Single Podcast Episode

const Favorite = require('../models/favorite');


const getAllFavorites = async (req,res) => {
    try {
        const favorites = await Favorite.find()
        if (!favorites || favorites.length === 0) {
            return res.status(400).json({message: 'Favs not found'})
        }
        return res.status(200).json(favorites)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal server error'})
    }
}

const getFavoriteById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const favorites = await Favorite.findById(id);
        if (favorites) {
            return res.json(favorites);
        }
        return res.status(404).json({message: 'Fav not found!'});
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error'});
    }
}

const createFavorite = async (req, res) => {
    try {
      const { podcastId } = req.body;
      const sessionId = req.session.id; // Retrieve session ID
  
      if (req.user) {
        const newFavorite = new Favorite({
          userId: req.user._id,
          podcastId
        })
        await newFavorite.save();
        res.json({ message: "Favorite added!" });
      } else {
        const existingFavorite = await Favorite.findOne({ sessionId, podcastId });
        if (existingFavorite) {
          return res.status(400).json({ message: "Favorite already exists!" });
        }
        const newFavorite = new Favorite({ sessionId, podcastId });
        await newFavorite.save();
        res.json({ message: "Favorite added!" });
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ message: "Failed to add favorite!" });
    }
}

const deleteFavorite = async (req, res) => {
    const favoriteId = req.params.id
    try {
        const deletedFavorite = await Favorite.findByIdAndDelete(favoriteId)
        if (!deletedFavorite) {
            return res.status(404).json({message: "Fav not found"});
        }
        return res.status(200).json(deletedFavorite)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    getAllFavorites,
    getFavoriteById,
    createFavorite,
    deleteFavorite
}