import { useState, useEffect } from "react";
import axios from 'axios'



function FavoriteReact({ podcastId }) {
    const [isFavorite, setIsFavorite] = useState(false)
    const [isLoading, setIsLoading] = useState(false) // Track loading state for feedback
  
    useEffect(() => {
      const fetchFavoriteStatus = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://localhost:3005/favorites`)
          setIsFavorite(response.data.isFavorite)
        } catch (error) {
          console.error("Error fetching favorite status:", error)
        } finally {
          setIsLoading(false)
        }
      };
      fetchFavoriteStatus();
    }, [podcastId])

    const toggleFavorite = async () => {
        setIsLoading(true);
        try {
          const response = await axios.post("http://localhost:3005/addfavorite", {
            podcastId,
          })
          console.log("Backend response:", response.data)
          setIsFavorite(response.data.isFavorite)
        } catch (error) {
          console.error("Error adding/removing favorite:", error)
        } finally {
          setIsLoading(false)
        }
      }
    

    return (
        <div className="favorite-btn">
            <button onClick={toggleFavorite} className="fav-btn">
                {isFavorite ? '-❤️' : '❤️'}
            </button>
        </div>
    )
}



export default FavoriteReact