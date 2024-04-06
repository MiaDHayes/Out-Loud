import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'


function SinglePodcastDetail() {
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/podcast/${id}`);
        setPodcast(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPodcast();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!podcast) {
    return <div>Podcast not found</div>;
  }

  return (
    <div className='single-details-container'>
        <div className='image-cover'>
            <img src={`http://localhost:3005/${podcast.coverPhoto}`} className='image-stuff' alt='Cover' />
        </div>
        <div className='single-title'>
            <h2>{podcast.title}</h2>
        </div>
        <div className='single-description'>
            <p>{podcast.description}</p>
        </div>
        <div className='single-audio' style={{display: 'flex', justifyContent: 'center'}}>
            <ReactPlayer 
                url={`http://localhost:3005/${podcast.podcastFile}`}
                controls= {true}
                playing= {false}
                light={true}
                width= "50%"
                height= "50px"
                onError={(error) => console.error('Error playing podcast:', error)}
            />
        </div>
    </div>
  );
}

export default SinglePodcastDetail;
