
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
