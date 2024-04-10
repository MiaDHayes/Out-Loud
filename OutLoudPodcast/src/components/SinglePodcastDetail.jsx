import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom'

function SinglePodcastDetail() {
  const [podcast, setPodcast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/podcast/${id}`)
        const podcastData = response.data
        setPodcast(podcastData)
        setTitle(podcastData.title)
        setDescription(podcastData.description)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
  
    fetchPodcast()
  }, [id])


  const handleEdit = async () => {
    try {
      const updatedPodcastData = {
        title,
        description
      }
      await axios.put(`http://localhost:3005/podcast/${id}`, updatedPodcastData);
      navigate(`/edit-podcast/${id}`);
    } catch (error) {
      console.error('Error editing podcast:', error);
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3005/podcast/${id}`);
      // After successful deletion, navigate back to the all-podcasts page
      navigate('/all-podcasts');
    } catch (error) {
      console.error('Error deleting podcast:', error);
    }
  }
  

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
      <div className='button-container'>
        <button className='edit-btn' onClick={handleEdit}>Edit</button>
        <button className='delete-btn' onClick={handleDelete}>Delete</button>
        <Link to='/all-podcasts' className='back-link'>Go Back</Link>
      </div>
    </div>
  );
}

export default SinglePodcastDetail;
