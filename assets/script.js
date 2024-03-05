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
        "hide"
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

