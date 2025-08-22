<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title> Quiz</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
   
  <div class="quiz-container">

    <div id="quiz-box">
      <h2 id="question"></h2>
      <ul id="options"></ul>
      <button id="nextBtn">Next</button>
    </div>

    <div id="message1" class="hidden"><h2>Jokes apart .... everyone knows who is best ...iykyk😏😏</h2></div>
    <div id="message2" class="hidden">
      <h2>Offcourse BRL...😎</h2>
      <button id="showAnswersBtn">Click here to show correct answers</button>
    </div>
    <div id="work-message" class="hidden"><h2>Put some effort  bro...give the quiz nC4 times to know answers via hit and trial</h2></div>

    <div id="score-box" class="hidden">
      <h2>Score Card</h2>
      <p id="score"></p>
      <ul id="answer-review"></ul>
      <button onclick="restartQuiz()">Restart Quiz</button>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>

body {
  font-family: Arial, sans-serif;
  background: url("img1.jpg") no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  padding: 10px;
}

.quiz-container {
  width: 100%;
  max-width: 500px;
  background: rgba(255,255,255,0.9);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0,0,0,0.4);
  text-align: center;
}



h2 {
  margin-bottom: 15px;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  background: #6c7ee2;
  margin: 8px 0;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  color: #000000;
}

ul li:hover {
  background: #2a69bd;
}

button {
  padding: 10px 15px;
  margin-top: 15px;
  border: none;
  border-radius: 8px;
  background: #09f12c;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #26b36f;
}

.hidden {
  display: none;
}
@media (max-width: 600px) {
  .quiz-container {
    padding: 15px;
  }

  h2 {
    font-size: 1rem;
  }

  ul li {
    font-size: 0.9rem;
    padding: 10px;
  }

  button {
    font-size: 0.9rem;
    padding: 10px 15px;
  }
}
const quizData = [
      {
    question: "Best society in akgec?",
    options: ["BRL", "CSI", "PC", "SI"],
    answer: " still a myth"
  },
  {
    question: "Better society than PC?",
       options: ["BRL", "CSI", "PC", " of course SI"],
    answer: " No comments"
  
  },

  {
    question: "Choose the correct answer ?",
    options: ["BRL<SI<CSI<PC", "CSI<PC<BRL<SI", "PC<CSI<SI<BRL", " PC<=CSI<=SI<=BRL"],
    answer: " PC<=CSI<=SI<=BRL"
 
  },

 
];

let currentQuestion = 0;
let userAnswers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;

    
    li.onclick = () => {
      userAnswers[currentQuestion] = option;

      Array.from(optionsEl.children).forEach(child => {
        child.style.background = "#f0f0f0";
        child.style.color = "black";
      });

     
      li.style.background = "#2563eb";
      li.style.color = "white";
    };

    if (userAnswers[currentQuestion] === option) {
      li.style.background = "#2563eb";
      li.style.color = "white";
    }

    optionsEl.appendChild(li);
  });
}

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    
    document.getElementById("quiz-box").classList.add("hidden");
    setTimeout(() => {
      document.getElementById("message1").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("message1").classList.add("hidden");
        document.getElementById("message2").classList.remove("hidden");
      }, 3000); 
    }, 0100); 
  }
});

document.getElementById("showAnswersBtn").addEventListener("click", () => {
  document.getElementById("message2").classList.add("hidden");
  document.getElementById("work-message").classList.remove("hidden");

  setTimeout(showScore, 3000);
});

function showScore() {
  document.getElementById("work-message").classList.add("hidden");
  document.getElementById("score-box").classList.remove("hidden");

  let score = 0;
  const reviewEl = document.getElementById("answer-review");
  reviewEl.innerHTML = "";

  quizData.forEach((q, index) => {
    const li = document.createElement("li");
    const userAns = userAnswers[index] || "Not answered";
    const correct = userAns === q.answer;
    if (correct) score++;
    li.textContent = `Q${index + 1}: Your Answer = ${userAns} | Correct Answer = ${q.answer}`;
    li.style.color = correct ? "green" : "red";
    reviewEl.appendChild(li);
  });

  document.getElementById("score").textContent = `You scored ${score} out of ${quizData.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  userAnswers = [];
  document.getElementById("score-box").classList.add("hidden");
  document.getElementById("quiz-box").classList.remove("hidden");
  loadQuestion();
}


loadQuestion();

