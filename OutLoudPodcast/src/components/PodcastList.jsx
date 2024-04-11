import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PodcastSwiper from '../helpers/PodcastSwiper'



function PodcastList() {
  const [podcasts, setPodcasts] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const featuredPodcasts = podcasts.slice(0, 3)

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
      <Link to= '/all-podcasts' className='allLinks'>All Podcasts</Link>
      <h2>Browse</h2>
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
      <PodcastSwiper podcasts={featuredPodcasts} title= 'Featured Podcasts'/>
      <button id='back' onClick={() => navigate('/home')}>Go Back</button>
    </div>
  )
}

export default PodcastList

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';


// function PodcastList() {
//   const [podcasts, setPodcasts] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPodcasts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3005/podcasts');
//         setPodcasts(response.data);
//       } catch (error) {
//         setError(error);
//         console.error('Error fetching podcasts:', error);
//       }
//     };

//     fetchPodcasts();
//   }, []);

//   if (error) {
//     return <div>Error fetching podcasts: {error.message}</div>;
//   }

//   return (
//     <div className="podcast-feed">
//       <Link to="/all-podcasts" className="all-links">
//         All Podcasts
//       </Link>
//       <h2>Browse</h2>

//       {podcasts.length > 0 ? (
//         <Swiper
//           spaceBetween={2} // Adjust spacing between slides
//           slidesPerView={"auto"} // Adjust number of slides based on screen size
//           navigation={true} // Enable navigation arrows
//         >
//           {podcasts.map((podcast) => (
//             <SwiperSlide key={podcast._id}>
//               <Link to={`/podcast/${podcast._id}`}>
//                 <img
//                   src={`http://localhost:3005/${podcast.coverPhoto}`}
//                   alt={podcast.title}
//                   onError={(e) => console.error('Image not loaded:', e.target.src)}
//                 />
//                 <h6>{podcast.username}</h6>
//                 <h3>{podcast.title}</h3>
//                 <p>{podcast.description}</p>
//               </Link>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <p>No podcasts found.</p>
//       )}

//       <button id="back" onClick={() => navigate('/home')}>
//         Go Back
//       </button>
//     </div>
//   );
// }

// export default PodcastList;
