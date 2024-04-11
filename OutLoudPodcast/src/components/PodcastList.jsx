import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PodcastSwiper from '../helpers/PodcastSwiper';
import Category from './Category';
import CategorySwiper from '../helpers/CategorySwiper';

function PodcastList() {
  const [podcasts, setPodcasts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const featuredPodcasts = podcasts.slice(0, 3);

  useEffect(() => {
    axios.get('http://localhost:3005/podcasts')
      .then(response => {
        setPodcasts(response.data);
      })
      .catch(error => {
        setError(error);
        console.error('Error fetching podcasts:', error);
      });

    axios.get('http://localhost:3005/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        setError(error);
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategorySelect = (selectedCategory) => {
    console.log('Selected category:', selectedCategory);
    // Implement logic to filter podcasts based on selected category
  };

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="bridgerton">
      <Link to="/create-podcast" className="allLinks">Create Podcast</Link>
      <h2>Browse</h2>
      <div className="podcast-slider">
        <PodcastSwiper podcasts={featuredPodcasts} title="Featured Podcasts" />
      </div>
      <div className="category-slider">
        <CategorySwiper categories={categories} title="Categories" />
      </div>
      <ul>
        {podcasts.map(podcast => (
          <li key={podcast._id} className="podcast-item">
            <Link to={`/podcast/${podcast._id}`}>
              <img src={`http://localhost:3005/${podcast.coverPhoto}`} alt="Cover" />
              <h6>{podcast.username}</h6>
              <h3>{podcast.title}</h3>
              <p>{podcast.description}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Category onSelectCategory={handleCategorySelect} />
      <button id="back" onClick={() => navigate('/home')}>Go Back</button>
    </div>
  );
}

export default PodcastList;

