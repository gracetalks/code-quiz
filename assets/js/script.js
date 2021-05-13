let questionContent = [
    question1 = {
        question:"What colour is the sky?",
        correctAns: "Blue",
        answerArray: ["Azul", "Blue", "Light Blue", "Grey"]
    },
    question2 = {
        question:"What colour is the sky at night?",
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
let question= document.getElementById('question');
let answers = document.getElementById('answers');
let feedback = document.getElementById('feedback');

//Saving records
let saveRecords = document.getElementById('saveRecords');
let displayScore = document.getElementById('displayScore');
let initialText = document.getElementById('initialText');
let submitInitials  = document.getElementById('submitInitials');

//final score page
let highscorePage = document.getElementById('highscorePage');
let highscoreContainer = document.getElementById('highscoreContainer');
let goBack = document.getElementById('goBack');
let clearHighscores = document.getElementById('clearHighscores');

let pageArray = [startPage, questionPage, saveRecords, highscorePage];

// viewScores.addEventListener('click', )
startButton.addEventListener('click', startQuiz)
// submmitInitial.addEventListener('click',)
// clearHighscores.addEventListener('click',)
// goBack.addEventListener('click',)


function hidePages(){
    for (let i = 0; i < pageArray.length; i++) {
        if(!pageArray[i].classList.contains('hide')){
            pageArray[i].classList.add('hide');
        }
    }
}

function hideTimer(){
    if(!timer.classList.contains('hide')){
        timer.classList.add('hide');
    }
}

let isQuizzing = false;
let quizTime = 75;
let secondsLeft;
timer.textContent = "Time " + quizTime;

let questionIndex;
let finalScore = 0;
let numberCorrect;
let numberIncorrect;


function startQuiz(){
    alert("start quiz")
}