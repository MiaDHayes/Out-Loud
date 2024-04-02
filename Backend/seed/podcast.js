

const mongoose = require('mongoose');
const db = require('./db'); // Import your database connection
const { Podcast } = require('../models/podcast'); // Import the Podcast model

async function seedDatabase() {
  try {
    // Data to seed
    const podcasts = [
      {
        title: 'Tech Talks',
        description: 'Discussions about latest technology trends',
        author: 'Tech Experts',
        coverImageUrl: 'https://example.com/tech-talks-cover.jpg',
      },
      // Add more podcasts as needed
    ];

    // Insert initial podcasts
    await Podcast.insertMany(podcasts);
    console.log('Initial podcasts created successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close database connection
    db.close();
  }
}

// Call the seedDatabase function to initiate the seeding process
seedDatabase();


