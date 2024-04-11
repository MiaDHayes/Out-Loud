import React, { useState, useEffect } from 'react';

function PodcastSearch({ podcasts }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredPodcasts, setFilteredPodcasts] = useState([])

  useEffect(() => {
    console.log('Podcasts:', podcasts)
    if (podcasts && searchQuery) {
      const filtered = podcasts.filter((podcast) =>
        podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredPodcasts(filtered)
      console.log('Filtered  podcasts:', filtered)
    } else {
        setFilteredPodcasts(podcasts || [])
    }
  }, [podcasts, searchQuery])

  const handleSearch = (event) => {
    const query = event.target.value
    setSearchQuery(query)
    console.log('Search query:', query)
  }



  return (
    <div>
      <input
        type="text"
        placeholder="Search podcasts..."
        value={searchQuery}
        onChange={handleSearch}
        className='searchbar'
      />
      {/* <ul>
        {filteredPodcasts.map((podcast) => (
          <li key={podcast.id}>
            {podcast.title}</li>
        ))}
      </ul> */}
    </div>
  )
}

export default PodcastSearch
