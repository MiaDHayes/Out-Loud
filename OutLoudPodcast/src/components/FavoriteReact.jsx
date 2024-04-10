import { useState } from "react";


function FavoriteReact() {
    const [isFavorite, setIsFavorite] = useState(false)
    
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite)
    }

    
    return (
        <div className="favorite-btn">
            <button onClick={toggleFavorite}>
                {isFavorite ? '❤️' : '-❤️'}
            </button>
        </div>
    )
}



export default FavoriteReact