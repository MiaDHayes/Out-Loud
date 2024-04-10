import { useState } from "react";


function FavoriteReact() {
    const [favorite, setFavorite] = useState({fav: 0})
}

const addFavorite = (favorite) => {
    setFavorite(prevFavorite => ({
        ...prevFavorite, [favorite]: prevFavorite[favorite] +1
    })) 
}

const removeFavorite = (favorite) => {
    if (favorite[favorite] > 0) {
        setFavorite(prevFavorite => ({
            ...prevFavorite, [favorite]: prevFavorite[favorite] -1
        }))
    }
}


return (
    <div className="favorite">
        <div>
            <button onClick={() => addFavorite('fav')}>❤️</button>
            <button onClick={() => removeFavorite('fav')}>❤️</button>
        </div>
    </div>
)




export default FavoriteReact