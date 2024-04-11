import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom'


function PodcastSwiper({ podcasts, title }) {

  return (
    <div className="podcast-swiper-wrapper">
      <h2>{title}</h2>

      {podcasts && podcasts.length > 0 ? (
        <Swiper
          spaceBetween={20} //spacing between slides
          slidesPerView="auto" //number of slides based on screen size
          navigation={true} //navigation arrows
        >
          {podcasts.map((podcast) => (
            <SwiperSlide key={podcast._id} className="podcast-item">
              <Link to={`/podcast/${podcast._id}`}>
                <img
                  src={`http://localhost:3005/${podcast.coverPhoto}`}
                  alt={podcast.title}
                  onError={(e) => console.error('Image not loaded:', e.target.src)}
                />
                <h3>{podcast.title}</h3>
                <p>{podcast.description}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No podcasts found for this category.</p>
      )}
    </div>
  );
}

export default PodcastSwiper;
