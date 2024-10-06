let questionIndex = 1;

        function showCreateQuiz() {
            document.getElementById("home").style.display = "none";
            document.getElementById("createQuizSection").style.display = "block";
            document.getElementById("quizListSection").style.display = "none";
        }

        function showQuizList() {
            document.getElementById("home").style.display = "none";
            document.getElementById("createQuizSection").style.display = "none";
            document.getElementById("quizListSection").style.display = "block";

            fetchQuizzes();
        }

        document.getElementById('addQuestionBtn').addEventListener('click', function() {
            const questionContainer = document.getElementById('questionsContainer');

            const newQuestionHTML = `
                <div class="question" data-question-index="${questionIndex}">
                    <label>Question ${questionIndex + 1}:</label>
                    <input type="text" name="questionText" required><br>
                    <label>Options:</label><br>
                    <div class="option">
                        <input type="text" name="option" required>
                        <input type="radio" name="correctAnswer_${questionIndex}" value="0" required> Correct
                    </div>
                    <div class="option">
                        <input type="text" name="option" required>
                        <input type="radio" name="correctAnswer_${questionIndex}" value="1"> Correct
                    </div>
                    <div class="option">
                        <input type="text" name="option" required>
                        <input type="radio" name="correctAnswer_${questionIndex}" value="2"> Correct
                    </div>
                    <div class="option">
                        <input type="text" name="option" required>
                        <input type="radio" name="correctAnswer_${questionIndex}" value="3"> Correct
                    </div>
                </div>
            `;
            questionContainer.insertAdjacentHTML('beforeend', newQuestionHTML);
            questionIndex++;
        });

        document.getElementById('quizForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const quizData = { title: formData.get('quizTitle'), questions: [] };

            for (let i = 0; i < questionIndex; i++) {
                const questionText = formData.getAll('questionText')[i];
                const options = formData.getAll('option').slice(i * 4, (i + 1) * 4);
                const correctAnswerIndex = formData.get(`correctAnswer_${i}`);

                quizData.questions.push({
                    question: questionText,
                    options: options,
                    correctAnswer: correctAnswerIndex
                });
            }

            fetch('/api/quizzes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(quizData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Quiz created successfully:', data);
                alert('Quiz created successfully!');
                this.reset();
                questionIndex = 1; 
                showQuizList(); 
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });

        function fetchQuizzes() {
            fetch('/api/quizzes')
                .then(response => response.json())
                .then(data => {
                    const quizList = document.getElementById("quizList");
                    quizList.innerHTML = ""; 
                    data.forEach(quiz => {
                        const listItem = document.createElement("li");
                        listItem.textContent = quiz.title; 
                        quizList.appendChild(listItem);
                    });
                })
                .catch((error) => {
                    console.error('Error fetching quizzes:', error);
                });
        }