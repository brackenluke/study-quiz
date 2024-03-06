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

// Get the require Dom Elements

let studyQuestionsEl = document.querySelector("#studyQuestions");
let headerTimerEl = document.querySelector("#headerTimer");
let choicesEl = document.querySelector("#options");
let submitBtn = document.querySelector("#submit-score");
let startBtn = document.querySelector("#start");
let nameEl = document.querySelector("name");
let feedbackEl = document.querySelector("feedback");

// Study Quiz Starting Options

let currentQuestionIndex = 0;
let time = studyQuestions.length * 15;
let timerID;

// Function to start Study Quiz and to Hide landing page

function quizStart() {
    timerId = setInterval(
        clockTick,
        1000
    );
    headerTimerEl.textContent = time;
    let landingPageEl = document.getElementById(
        "study-screen"
    );
    landingPageEl.setAttribute(
        "class",
        "hidden"
    );
    studyQuestionsEl.removeAttribute(
        "class"
    );
    getQuestion();
}

// Function to loop to get random questions and pair with the answers, also creates a list with buttons the user can see

function getQuestion() {
    let currentQuestion = studyQuestions[currentQuestionIndex];
    let promptEl = document.getElementById(
        "question-text"
    );
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(
        function (choice, i) {
            let choiceBtn = document.createElement(
                "button"
            );
            choiceBtn.setAttribute(
                "value",
                choice
            );
            choiceBtn.textContent = i + 1 + ". " + choice;
            choiceBtn.onclick = questionResult;
            choicesEl.appendChild(
                choiceBtn
            );
        }
    );
}

// Function that checks for correct answer. If answer is wrong, will deduct time. Sends user to next question.

function questionResult() {
	if (
		this.value !==
		studyQuestions[currentQuestionIndex]
			.answer
	) {
		time -= 10;
		if (time < 0) {
			time = 0;
		}
		timerEl.textContent = time;
		feedbackEl.textContent = `Wrong Answer! Actually, the answer was 
		${studyQuestions[currentQuestionIndex].answer}.`;
		feedbackEl.style.color = "red";
	} else {
		feedbackEl.textContent =
			"Correct!";
		feedbackEl.style.color =
			"green";
	}
	feedbackEl.setAttribute(
		"class",
		"notify"
	);
	setTimeout(function () {
		feedbackEl.setAttribute(
			"class",
			"notify hidden"
		);
	}, 1000);
	currentQuestionIndex++;
	if (
		currentQuestionIndex ===
		questions.length
	) {
		quizEnd();
	} else {
		getQuestion();
	}
}

// Function that ends the Study Quiz if the Timer has no time left

function timerZero() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// Function that ends the Study Quiz and brings up score

function quizEnd() {
    clearInterval(timerID);
    let endingScreenEl = 
        document.getElementById(
            "study-end"
        );
    endingScreenEl.removeAttribute(
        "class"
    );
    let studyScoreEl =
        document.getElementById(
            "score-final"
        );
    studyScoreEl.textContent = time;
    studyQuestionsEl.setAttribute(
        "class",
        "hidden"
    );
}