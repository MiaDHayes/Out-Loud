import React from "react"


function Category({ categories, onPodcastSelect }) {
    const categories = [
        { id: 1, name: 'movies', podcasts: [] },
        { id: 2, name: 'music', podcasts: [] },
        { id: 3, name: 'anime', podcasts: [] },
        { id: 4, name: 'sports', podcasts: [] },
        { id: 5, name: 'pop culture', podcasts: [] },
    ]


    return (
        <div className= "category">
            <h2>{categories.map((category) => category.name)}</h2>
            {categories.podcasts.length > 0 && (
                <ul>
                    {categories.podcasts.map((podcastId) => (
                        <li key={podcastId}>
                            <p>Podcast {podcastId}</p>
                            {onPodcastSelect && (
                                <button onClick={() => onPodcastSelect(podcastId)}>Select</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Category