let questionContent = [
    question1 = {
        question: "What colour is the sky?",
        correctAns: "Blue",
        answerArray: ["Azul", "Blue", "Light Blue", "Grey"]
    },
    question2 = {
        question: "What colour is the sky at night?",
        correctAns: "Black",
        answerArray: ["Black", "Purple", "Blackberry", "Red"]
    }
]

let highscores = [];

// header
let viewScores = document.getElementById('viewScores');
let timer = document.getElementById('timer');

//landing page
let startPage = document.getElementById('startPage');
let startButton = document.getElementById('startButton');

//question page
let questionPage = document.getElementById('questionPage');
let question = document.getElementById('question');
let answers = document.getElementById('answers');
let feedback = document.getElementById('feedback');

//Saving records
let saveRecords = document.getElementById('saveRecords');
let displayScore = document.getElementById('displayScore');
let initialText = document.getElementById('initialText');
let submitInitials = document.getElementById('submitInitials');

//final score page
let highscorePage = document.getElementById('highscorePage');
let highscoreContainer = document.getElementById('highscoreContainer');
let goBack = document.getElementById('goBack');
let clearHighscores = document.getElementById('clearHighscores');

let pageArray = [startPage, questionPage, saveRecords, highscorePage];

viewScores.addEventListener('click', openHighscorePage);
startButton.addEventListener('click', startQuiz);
submitInitials.addEventListener('click', organizeHighScores);
clearHighscores.addEventListener('click', clearHighscorers);
goBack.addEventListener('click', openStartPage);


function hidePages() {
    for (let i = 0; i < pageArray.length; i++) {
        if (!pageArray[i].classList.contains('hide')) {
            pageArray[i].classList.add('hide');
        }
    }
}

function hideTimer() {
    if (!timer.classList.contains('hide')) {
        timer.classList.add('hide');
    }
}

let isQuizzing = false;
let quizTime = 30;
let secondsLeft;
timer.textContent = "Time " + quizTime;

let questionIndex;
let finalScore = 0;
let numberCorrect;
let numberIncorrect;

function questionOrder(arr) {
    console.log("arr", arr)
    let arrIndex = [];
    for (let i = 0; i < arr.length; i++) {
        arrIndex.push(i);
    }
    return arrayShuffle(arrIndex)
}

let questionArrayOrder;

// starting the quiz
function startQuiz() {
    // define initial quiz variables
    numberCorrect = 0;
    numberIncorrect = 0;
    questionArrayOrder = questionOrder(questionContent);
    secondsLeft = quizTime;
    isQuizzing = true;
    questionIndex = 0;
    // calling the class hide on each page
    hidePages();
    questionPage.classList.remove('hide');

    clearQuestion();
    questionUpdater(questionContent, questionArrayOrder[questionIndex]);

    // starts the countdown of the timer 
    let timerInterval = setInterval(function () {
        secondsLeft--;

        timer.textContent = "Time: " + secondsLeft;

        if (secondsLeft < 0 || !isQuizzing) {
            clearInterval(timerInterval);
            secondsLeft = quizTime;

            if (isQuizzing) {
                finalScore = 0;
                openInitialsPage();
            }
        }

    }, 1000)
}

function openInitialsPage() {
    hideTimer();
    if (finalScore < 1) {
        finalScore = 0;
    }
    displayScore.textContent = finalScore;
    isQuizzing = false;
    hidePages();
    saveRecords.classList.remove('hide')
}

function openHighscorePage() {
    hideTimer();
    isQuizzing = false;
    hidePages();
    highscorePage.classList.remove('hide');

}

function organizeHighScores() {
    highscores.push([finalScore, initialText.value]);
    highscores.sort((a, b) => b[0] - a[0]);

    eraseHighscores();

    for (let i = 0; i < highscores.length; i++) {
        addInitial(highscores[i]);
    }

    openHighscorePage();
}

function addInitial(index) {
    let newHighscore = document.createElement('div');
    newHighscore.textContent = index[0] + " - " + index[1];
    newHighscore.classList.add("highscore");
    highscoreContainer.appendChild(newHighscore);
}


function eraseHighscores() {
    while (highscoreContainer.hasChildNodes()) {
        highscoreContainer.removeChild(highscoreContainer.childNodes[0]);
    }
}

function clearHighscorers() {
    eraseHighscores();
    highscores = [];
}


function openStartPage() {
    timer.textContent = "Time: " + secondsLeft;
    timer.classList.remove('hide');
    isQuizzing = false;
    hidePages();
    startPage.classList.remove('hide');
}


function arrayShuffle(arr) {
    console.log("shuffle arr argument", arr);
    return arr.sort(() => Math.random() - 0.5);
}

function questionUpdater(array, index) {
    question.textContent = array[index].question;
    let ans;
    let but;
    let currentAnswerArray = arrayShuffle(array[index].answerArray);

    for (let i = 0; i < currentAnswerArray.length; i++) {

        ans = document.createElement("LI");
        but = document.createElement('button');

        ans.appendChild(but);
        but.textContent = i + 1 + ". " + currentAnswerArray[i];

        ans.addEventListener("click", questionController);

        answers.appendChild(ans);
    }
}

function clearQuestion() {
    question.textContent = "";
    while (answers.hasChildNodes()) {
        answers.removeChild(answers.childNodes[0]);
    }
}

function questionController(event) {
    console.log(event);

    if (event.target.textContent.substring(3) == questionContent[questionArrayOrder[questionIndex]].correctAns) {
        feedback.textContent = "Correct";
        numberCorrect++;

    } else {
        feedback.textContent = "Incorrect";
        numberIncorrect++;
        secondsLeft -= 5;
    }

    timer.textContent = "Time:" + secondsLeft;

    setTimeout(function () {
        feedback.textContent = ""
    }, 1000);

    clearQuestion();
    questionIndex++;

    if (questionIndex < questionContent.length) {
        questionUpdater(questionContent, questionArrayOrder[questionIndex]);
    } else {
        finalScore = secondsLeft;
        openInitialsPage();
    }
}