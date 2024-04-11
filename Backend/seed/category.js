const mongoose = require('mongoose');
const Category = require('./models/category');


mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


const categoriesData = [
  { name: 'Movies' },
  { name: 'Sports' },
  { name: 'Music' },
  { name: 'Shows' },
  { name: 'Pop Culture' },
  { name: 'Anime' },
];


const seedCategories = async () => {
  try {
    await Category.deleteMany();

    const createdCategories = await Category.insertMany(categoriesData);

    console.log('Categories seeded successfully:', createdCategories);
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    mongoose.disconnect();
  }
};


seedCategories();
