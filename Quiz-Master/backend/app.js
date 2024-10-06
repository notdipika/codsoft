const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/auth', authRoutes);       // User login/register routes
app.use('/quizzes', quizRoutes);    // Quiz creation and fetching routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
