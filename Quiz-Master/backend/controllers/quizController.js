const Quiz = require('../models/quizModel');

// Create a new quiz
const createQuiz = async (req, res) => {
  const { title, questions } = req.body;
  const newQuiz = new Quiz({ title, questions });
  try {
    await newQuiz.save();
    res.status(200).send('Quiz created successfully');
  } catch (error) {
    res.status(500).send('Error creating quiz');
  }
};

// Get all quizzes
const getQuizzes = async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
};

module.exports = { createQuiz, getQuizzes };
