import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PodcastSwiper from '../helpers/PodcastSwiper'
import Category from './Category'
import CategorySwiper from '../helpers/CategorySwiper'



function PodcastList() {
  const [podcasts, setPodcasts] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const featuredPodcasts = podcasts.slice(0, 3)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    
    axios.get('http://localhost:3005/podcasts')
      .then(response => {
        setPodcasts(response.data)
      })
      .catch(error => {
        setError(error)
        console.error('Error fetching podcasts:', error)
      })

      
      axios.get('http://localhost:3005/categories')
      .then(response => {
        setCategories(response.data)
      })
      .catch(error => {
        setError(error)
        console.error('Error fetching categories')
      })
  }, [])
  

  const handleCategorySelect = (selectedCategory) => {
    console.log('Selected category:', selectedCategory)
  }

  if (error) {
    return <div>Error fetching podcasts: {error.message}</div>
  }

  return (
    <div className= 'bridgerton'>
      <Link to= '/all-podcasts' className='allLinks'>All Podcasts</Link>
      <h2>Browse</h2>
      <div className= 'podcast-slider'>
        <PodcastSwiper podcasts={featuredPodcasts} title= 'Featured Podcasts'/>
      </div>
      <div className= 'category-slider'>
        <CategorySwiper categories={categories} title='Categories'/>
      </div>
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
                <h6>{podcast.username}</h6>
                <h3>{podcast.title}</h3>
                <p>{podcast.description}</p>
              </Link>  
            </li>
          )
          })}
      </ul>
      <Category onSelectCategory={handleCategorySelect}/>
      <button id='back' onClick={() => navigate('/home')}>Go Back</button>
    </div>
  )
}

export default PodcastList
