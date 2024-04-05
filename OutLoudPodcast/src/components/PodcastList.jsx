import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PodcastList() {
  const [podcasts, setPodcasts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3005/podcasts')
      .then(response => {
        setPodcasts(response.data)
      })
      .catch(error => {
        console.error('Error fetching podcasts:', error)
      })
  }, [])

  return (
    <div>
      <h2>Podcasts</h2>
      <ul>
        {podcasts.map(podcast => {
          console.log('Podcast file:', podcast.podcastFile)
            return (
            <li key={podcast._id}>
              <img
                src={`/uploads/coverPhotos/${podcast.coverPhoto}`}
                alt='Cover'
                onLoad={() => console.log('Image loaded:', `/coverPhoto/${podcast.coverPhoto}`)}
                onError={() => console.error('Image not loaded:', `/coverPhoto/${podcast.coverPhoto}`)}
              />
              <h3>{podcast.title}</h3>
              <p>{podcast.description}</p>
    {/* //The source needs to be changed to uploads/podcastFile */}
              <audio controls>
                <source src={`/uploads/podcastFiles/${podcast.podcastFile}`} type='audio/mpeg' />
                Your browser does not support the audio element
                
              </audio>
            </li>
          )
          })}
      </ul>
    </div>
  )
}

export default PodcastList