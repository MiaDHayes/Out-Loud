import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

function CategorySwiper({ categories, title }) {
  return (
    <div className="category-swiper-wrapper">
      <h2>{title}</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView="auto"
        navigation={true}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.name} className="category-item">
            <div className="category-card">
              <h3>{category.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CategorySwiper

