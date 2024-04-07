import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react'

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3005/user', {
        username,
        password,
        email,
        confirmPassword
      });

      console.log('Account created successfully:', response.data);
      navigate('/login')
      // Optionally, you can redirect the user to the login page after account creation
    //   window.location.href = '/login';
    } catch (error) {
      console.error('Account creation error:', error);
      setError('An error occurred while creating your account. Please try again later.');
    }
  };

  return (
    <div className="create-account-container">
      <h2>Create Account</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='create-button'>Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccount;
