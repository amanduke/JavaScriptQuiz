// followed tutorial from https://www.youtube.com/watch?v=49pYIMygIcU

// select all elements
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");

var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What does HTML stand for?",
        choiceA : "HyperText Markup Language",
        choiceB : "HyperText Makeup Language",
        choiceC : "HyperLink Markup Language",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        choiceA : "Corrective Style Script",
        choiceB : "Cascading Style Sheets",
        choiceC : "Collective Sheets Style",
        correct : "B"
    },{
        question : "What does JS stand for?",
        // imgSrc : "img/js.png",
        choiceA : "JavaSheet",
        choiceB : "JavaStyle",
        choiceC : "JavaScript",
        correct : "C"
    },{
        question : "Can a single text link point to two different web pages?",
        choiceA : "sometimes",
        choiceB : "yes",
        choiceC : "no",
        correct : "C"
    },{
      question : "What are JavaScript Data Types?",
      choiceA : "Null, Ball, Float, Defined, Position",
      choiceB : "Number, String, Boolean, Object, Undefined",
      choiceC : "Strings, Alpha, Slice, Script, ASP",
      correct : "B"
  }
    
];

// create some variables

var lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
var questionTime = 10; // 10s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;



// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    // qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

 
