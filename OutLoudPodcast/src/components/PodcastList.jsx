import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'


function PodcastList() {
  const [podcasts, setPodcasts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    
    axios.get('http://localhost:3005/podcasts')
      .then(response => {
        setPodcasts(response.data)
      })
      .catch(error => {
        setError(error)
        console.error('Error fetching podcasts:', error)
      })
  }, [])

  if (error) {
    return <div>Error fetching podcasts: {error.message}</div>
  }

  return (
    <div className= 'bridgerton'>
      <h2>Podcasts</h2>
      <ul>
        {podcasts.map(podcast => {
          console.log('Podcast file:', podcast.podcastFile)
            return (
            <li key={podcast._id} className='podcast-item'>
              <Link to= {`/podcast/${podcast._id}`}>
                <img
                  src={`http://localhost:3005/${podcast.coverPhoto}`}
                  alt='Cover'
                  onLoad={() => console.log('Image loaded:', `/uploads/coverPhotos/${podcast.coverPhoto}`)}
                  onError={(e) => console.error('Image not loaded:', e.target.src)}
                />
                <h3>{podcast.title}</h3>
                <p>{podcast.description}</p>
                {/* <ReactPlayer 
                  url={`/uploads/podcastFiles/${podcast.podcastFile}`}
                  controls= {true}
                  playing= {true}
                  width= "100%"
                  height= "50px"
                  onError={(error) => console.error('Error playing podcast:', error)}
                /> */}
              </Link>  
            </li>
          )
          })}
      </ul>
    </div>
  )
}

export default PodcastList