const express = require('express');
const { createQuiz, getQuizzes } = require('../controllers/quizController');
const router = express.Router();

router.post('/create-quiz', createQuiz);
router.get('/', getQuizzes);

module.exports = router;
