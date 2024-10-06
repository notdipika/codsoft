const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for quiz questions and options
const questionSchema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      optionText: {
        type: String,
        required: true,
      }
    }
  ],
  correctAnswer: {
    type: String,
    required: true,
  }
});

// Main Quiz Schema
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [questionSchema],  // Array of question objects
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User who created the quiz
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
