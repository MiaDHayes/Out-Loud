import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
            <img src={`/uploads/coverPhotos/${podcast.coverPhoto}`} alt='Cover' />
        </div>
        <div className='single-title'>
            <h2>{podcast.title}</h2>
        </div>
        <div className='single-description'>
            <p>{podcast.description}</p>
        </div>
      <audio controls>
        <source src={`/uploads/podcastFiles/${podcast.podcastFile}`} type='audio/mp3' />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default SinglePodcastDetail;
