import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

function CategorySwiper({ categories, title }) {
  return (
    <div className="category-swiper-wrapper">
      <h2>{title}</h2>
      <Swiper
        spaceBetween={20} // Adjust spacing between slides
        slidesPerView="auto" // Adjust number of slides based on screen size
        navigation={true} // Enable navigation arrows
      >
        {categories.map((category) => (
          <SwiperSlide key={category.name} className="category-item">
            <div className="category-card">
              <h3>{category.name}</h3>
              {/* You can add additional category details here */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CategorySwiper;

