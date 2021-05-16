// questions that will appear on question page
var questionContent = [
    question1 = {
        question: "What are variable used for in JavaScript?",
        correctAns: "To store various values (numbers, letters, dates, etc)",
        answerArray: ["To vary randomly", "To store various values (numbers, letters, dates, etc)", "To confuse the HTML and CSS", "To delete all content"]
    },
    question2 = {
        question: "How many tags are in a normal element?",
        correctAns: "2",
        answerArray: ["2", "3", "5", "1"]
    },
    question3 = {
        question: "Where is a meta tag only found?",
        correctAns: "Home Page",
        answerArray: ["Last Page", "Any Page", "Home Page", "Second Page"]
    },
    question4 = {
        question: "Which property is used to change the face of a font?",
        correctAns: "Font-Family",
        answerArray: ["Font-Variable", "Font-Family", "Font-Style", "Font-Weight"]
    },
    question5 = {
        question: "Which property specifies the right padding of an element?",
        correctAns: "Padding-Right",
        answerArray: ["Padding-Right", "Padding-Left", "Padding-Top", "Padding-Bottom"]
    },
]

var highscores = [];

// header
var viewScores = document.getElementById('viewScores');
var timer = document.getElementById('timer');

//landing page
var startPage = document.getElementById('startPage');
var startButton = document.getElementById('startButton');

//question page
var questionPage = document.getElementById('questionPage');
var question = document.getElementById('question');
var answers = document.getElementById('answers');
var feedback = document.getElementById('feedback');

// saving records of scores
var saveRecords = document.getElementById('saveRecords');
var displayScore = document.getElementById('displayScore');
var initialText = document.getElementById('initialText');
var submitInitials = document.getElementById('submitInitials');

// final score page
var highscorePage = document.getElementById('highscorePage');
var highscoreContainer = document.getElementById('highscoreContainer');
var goBack = document.getElementById('goBack');
var clearHighscores = document.getElementById('clearHighscores');

// order of pages 
var pageArray = [startPage, questionPage, saveRecords, highscorePage];

viewScores.addEventListener('click', openHighscorePage);
startButton.addEventListener('click', startQuiz);
submitInitials.addEventListener('click', organizeHighScores);
clearHighscores.addEventListener('click', clearHighscorers);
goBack.addEventListener('click', openStartPage);


function hidePages() {
    for (var i = 0; i < pageArray.length; i++) {
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

var isQuizzing = false;
var quizTime = 75;
var secondsLeft;
timer.textContent = "Time " + quizTime;

var questionIndex;
var finalScore = 0;
var numberCorrect;
var numberIncorrect;

function questionOrder(arr) {
    console.log("arr", arr)
    var arrIndex = [];
    for (var i = 0; i < arr.length; i++) {
        arrIndex.push(i);
    }
    return arrayShuffle(arrIndex)
}

var questionArrayOrder;

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
    var timerInterval = setInterval(function () {
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

// calling timer to be hidden and display score
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

// open high score page while hiding timer
function openHighscorePage() {
    hideTimer();
    isQuizzing = false;
    hidePages();
    highscorePage.classList.remove('hide');

}

// ordering high scores with the top score being displayed against the score that was just posted
function organizeHighScores() {
    highscores.push([finalScore, initialText.value]);
    highscores.sort((a, b) => b[0] - a[0]);

    eraseHighscores();

    for (var i = 0; i < highscores.length; i++) {
        addInitial(highscores[i]);
    }

    openHighscorePage();
}

// calling for new high score to be displayed 
function addInitial(index) {
    var newHighscore = document.createElement('div');
    newHighscore.textContent = index[0] + " - " + index[1];
    newHighscore.classList.add("highscore");
    highscoreContainer.appendChild(newHighscore);
}

// listing in the high score container
function eraseHighscores() {
    while (highscoreContainer.hasChildNodes()) {
        highscoreContainer.removeChild(highscoreContainer.childNodes[0]);
    }
}

// clearing high scores 
function clearHighscorers() {
    eraseHighscores();
    highscores = [];
}

// opening start page with timer being displayed
function openStartPage() {
    timer.textContent = "Time: " + secondsLeft;
    timer.classList.remove('hide');
    isQuizzing = false;
    hidePages();
    startPage.classList.remove('hide');
}

// reordering elements randomly
function arrayShuffle(arr) {
    console.log("shuffle arr argument", arr);
    return arr.sort(() => Math.random() - 0.5);
}

// updating questions once answered
function questionUpdater(array, index) {
    question.textContent = array[index].question;
    var ans;
    var but;
    var currentAnswerArray = arrayShuffle(array[index].answerArray);

    for (var i = 0; i < currentAnswerArray.length; i++) {

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