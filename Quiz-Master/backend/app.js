const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(express.static('public')); 


mongoose.connect('mongodb://localhost:27017/qwizzie', { useNewUrlParser: true, useUnifiedTopology: true });


const quizSchema = new mongoose.Schema({
    title: String,
    questions: [{
        question: String,
        options: [String],
        correctAnswer: String
    }]
});

const Quiz = mongoose.model('Quiz', quizSchema);

app.post('/api/quizzes', async (req, res) => {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json(newQuiz);
});

app.get('/api/quizzes', async (req, res) => {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});