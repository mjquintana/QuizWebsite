const questions = [
    {
        question: "Who is the First Pokemon in the national pokedex?",
        answers: [
            { text: "Pikachu", correct: false},
            { text: "Bulbasaur", correct: true},
            { text: "Mew", correct: false},
            { text: "Rhydon", correct: false},
        ]
    },
    {
        question: "Who is the gym leader of Cerulean City?",
        answers: [
            { text: "Giovanni", correct: false},
            { text: "Blaine", correct: false},
            { text: "Brock", correct: false},
            { text: "Misty", correct: true},
        ]
    },
    {
        question: "How many badges are required to challenge the Pokemon League?",
        answers: [
            { text: "12", correct: false},
            { text: "10", correct: false},
            { text: "8", correct: true},
            { text: "5", correct: false},
        ]
    },
    {
        question: "Which Pokemon evolves from Doduo?",
        answers: [
            { text: "Dugtrio", correct: false},
            { text: "Diglett", correct: false},
            { text: "Dodrio", correct: true},
            { text: "Snorlax", correct: false},
        ]
    },
    {
        question: "At what level do you encounter Mewtwo in the Cerulean Cave?",
        answers: [
            { text: "Level 100", correct: false},
            { text: "Level 65", correct: false},
            { text: "Level 1", correct: false},
            { text: "Level 70", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
};

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
};

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();


