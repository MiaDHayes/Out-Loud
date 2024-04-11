import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [podcasts, setPodcasts] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user data');
      }
    };

    const fetchPodcasts = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/user/${userId}/podcasts`);
        setPosts(response.data);
      } catch (error) {
        setError('Error fetching user podcasts');
      }
    };

    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/user/${userId}/playlists`);
        setPlaylists(response.data);
      } catch (error) {
        setError('Error fetching user playlists');
      }
    };

    fetchUser();
    fetchPodcasts();
    fetchPlaylists();
  }, [userId]);

  const handleEditPost = (podcastId) => {
    // Implement edit post functionality
  };

  const handleDeletePodcast = (podcastId) => {
    // Implement delete post functionality
  };

  const handleDeletePlaylist = (playlistId) => {
    // Implement delete playlist functionality
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {user && (
        <div>
          <h2>{user.username}'s Profile</h2>
          <h3>Posts</h3>
          <ul>
            {podcasts.map(podcast => (
              <li key={podcast.id}>
                {podcast.title}
                <button onClick={() => handleEditPost(podcast.id)}>Edit</button>
                <button onClick={() => handleDeletePodcast(podcast.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <h3>Playlists</h3>
          <ul>
            {playlists.map(playlist => (
              <li key={playlist.id}>
                {playlist.name}
                <button onClick={() => handleDeletePlaylist(playlist.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
