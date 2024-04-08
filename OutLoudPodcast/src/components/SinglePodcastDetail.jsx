import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import User from './User'

function SinglePodcastDetail() {
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id, username } = useParams();
  const navigate = useNavigate()

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

    const fetchUsername = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/users/${username}`);
        setPodcast(prevPodcast => ({...prevPodcast, username: response.data.username}));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPodcast();
    fetchUsername();
  }, [id, username]);

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
        {/* <User username={podcast.username} /> */}
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
      <button id='back' onClick={() => navigate('/all-podcasts')}>Go Back</button>
    </div>
  );
}

export default SinglePodcastDetail;
