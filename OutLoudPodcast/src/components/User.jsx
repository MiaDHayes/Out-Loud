import React from 'react';
import { Link } from 'react-router-dom';

const User = ({ username }) => {
  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <nav>
        <ul>
          <li>
            <Link to="/profile" className='myprof'>My Profile</Link>
          </li>
          <li>
            <Link to={`/profile/${username}`} className='yourprof'>{username}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default User;
