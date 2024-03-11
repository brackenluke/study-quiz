// script.js

// Study Quiz questions and Answers

let studyQuestions = [
    {
        prompt: "<h1>Text</h1> is the correct way of making a header in HTML.",
        options: [
            "True",
            "False",
        ],
        answer: "True"
    },

    {
        prompt: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Leveler",
            "Hyper Text Marketing Language",
            "Hyper Texter Marker Lingo",
            "Hyper Text Markup Language",
        ],
        answer: "Hyper Text Markup Language",
    },

    {
        prompt: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Colorful Style Sheets",
            "Computing Style Sheets",
            "Cotton Super Street",
        ],
        answer: "Cascading Style Sheets",
    },

    {
        prompt: "Where in the HTML document is the correct place to refer to an external style sheet?",
        options: [
            "In the <body> section",
            "In the <head> section",
            "At the end of the document",
        ],
        answer: "In the <head> section",
    },

    {
        prompt: "Where is the correct place to insert a JavaScript?",
        options: [
            "The <body> section",
            "The <head> section",
            "Both the <head> section and the <body> section are correct",
        ],
        answer: "Both the <head> section and the <body> section are correct",
    },

    {
        prompt: "What is the correct syntax for refferring to an external script called 'xyz.js'?",
        options: [
            "<script src='xyz.js'>",
            "<script href='xyz.js'>",
            "<script class='xyz.js'>",
        ],
        answer: "<script src='xyz.js'>",
    },
];

// Get Dom Elements

let studyQuestionsEl = document.querySelector("#studyQuestions");
let headerTimerEl = document.querySelector("#headerTimer");
let optionsEl = document.querySelector("#options");
let saveBtn = document.querySelector("#study-submit");
let startBtn = document.querySelector("#start-quiz");
let userNameEl = document.querySelector("#user-name");
let notifyEl = document.querySelector("#notify");

// Sets Study Quiz initial state
let currentQuestionIndex = 0;
let time = studyQuestions.length * 15;
let timerInterval;

// Starts the Study Quiz and Hides Frontpage
function quizStart() {
	headerTimerEl.textContent = time;
	timerInterval = setInterval(
		timerZero,
		1000
	);
	
	let studyScreenEl = document.getElementById("study-screen");
	studyScreenEl.setAttribute("class","hidden");
    studyQuestionsEl.removeAttribute("class");
	getQuestion();
}

// Function that loops through the questions and the answers, then 
//creates a list
function getQuestion() {
	let currentQuestion = studyQuestions[currentQuestionIndex];
	let promptEl = document.getElementById("question-text");
	promptEl.textContent = currentQuestion.prompt;
	optionsEl.innerHTML = "";
	currentQuestion.options.forEach(
		function (choice, i) {
			let choiceBtn = document.createElement("button");
			choiceBtn.setAttribute("value",choice);
			choiceBtn.textContent = i + 1 + ". " + choice;
			choiceBtn.onclick = questionNotify;
			optionsEl.appendChild(choiceBtn);
		}
	);
}

//Function that with check the for correct answer, will deduct time for 
//wrong answers, and skips to the next question
function questionNotify() {
	if (
		this.value !=
		studyQuestions[currentQuestionIndex]
			.answer
	) {
		time -= 10;
		if (time < 0) {
			time = 0;
		}
		headerTimerEl.textContent = time;
		notifyEl.textContent = `Wrong! The correct answer was 
		${studyQuestions[currentQuestionIndex].answer}.`;
		notifyEl.style.color = "red";
	} else {
		notifyEl.textContent =
			"Correct!";
		notifyEl.style.color =
			"green";
	}
	notifyEl.setAttribute(
		"class",
		"notify"
	);
	setTimeout(function () {
		notifyEl.setAttribute(
			"class",
			"notify hidden"
		);
	}, 1000);
	currentQuestionIndex++;
	if (
		currentQuestionIndex ===
		studyQuestions.length
	) {
		quizEnd();
	} else {
		getQuestion();
	}
}

// Function that will end the quiz, stop the timer, and bring up the score
function quizEnd() {
	clearInterval(timerInterval);
	let endScreenEl = document.getElementById("study-end");
	endScreenEl.removeAttribute("class");
	let finalScoreEl = document.getElementById("study-score");
	finalScoreEl.textContent = time;
	studyQuestionsEl.setAttribute("class","hidden");
}

//Function that will end the quiz once timer runs out
function timerZero() {
	time--;
	headerTimerEl.textContent = time;
	if (time <= 0) {
		quizEnd();
	}
}

// Saves the final score
function saveHighscore() {
	let name = userNameEl.value.trim();
	if (name !== "") {
		let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
		let newScore = {
			score: time,
			name: name,
		};
		highscores.push(newScore);
		window.localStorage.setItem("highscores",JSON.stringify(highscores));
		alert("Your Score has been Submitted to the Highscores successfully!");
	}
}

function checkForEnter(event) {
	if (event.key === "Enter") {
		saveHighscore();
		alert("Your Score has been Submitted to the Highscores successfully!");
	}
}

userNameEl.onkeyup = checkForEnter;

saveBtn.onclick = saveHighscore;

startBtn.onclick = quizStart;
