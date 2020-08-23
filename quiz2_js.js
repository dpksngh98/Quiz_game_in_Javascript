const options = document.querySelector(".options").children;
const answerTrackerContainer  = document.querySelector(".answer-tracker");
const questionNumberSpan = document.querySelector(".question-num-value");
const totalQuestionSpan = document.querySelector(".total-question");
const question = document.querySelector(".question");
const correctAnswerSpan=document.querySelector(".correct-answers");
const totalQuestion2Span = document.querySelector(".Total-question2");
const percentage=document.querySelector(".percentage");
const op1=document.querySelector(".option1");
const op2=document.querySelector(".option2");
const op3=document.querySelector(".option3");
const op4=document.querySelector(".option4");
let questionIndex;
let index = 0;
let myArray=[];
let score=0;

const questions = [
    {
        q:'Where does the object is created?',
        options:['class','constructor','destructor','attributes'],
        answer:0
    },
    {
        q:'How to access the object in the class?',
        options:['scope resolution operator','ternary operator','direct member access operator','resolution operator'],
        answer:2
    },
    {
        q:'Which of these following members are not accessed by using direct member access operator?',
        options:['private','public','protected','both private & protected'],
        answer:3
    },
    {
        q:'Pick out the other definition of objects',
        options:['member of the class','associate of the class','attribute of the class','instance of the class'],
        answer:3
    },
    {
        q:' How many objects can present in a single class?',
        options:['1','2','3',' as many as possible'],
        answer:3
    }
]

totalQuestionSpan.innerHTML=questions.length;
function load(){
    questionNumberSpan.innerHTML = index+1;
    question.innerHTML = questions[questionIndex].q;
    op1.innerHTML= questions[questionIndex].options[0];
    op2.innerHTML= questions[questionIndex].options[1];
    op3.innerHTML= questions[questionIndex].options[2];
    op4.innerHTML= questions[questionIndex].options[3];
    index++;
}

function check(element){
    if(element.id == questions[questionIndex].answer)
    {
        element.classList.add("correct");
        updateAnswerTracker("correct");
        score++;
    }
    else{
        element.classList.add("wrong");
        updateAnswerTracker("wrong");
    }
    disabledOptions();
}

function disabledOptions()
{
    for(let i=0;i<options.length;i++)
    {
        options[i].classList.add("disabled");
        if(options[i].id == questions[questionIndex].answer)
        {
            options[i].classList.add("correct");
        }
    }
}

function enableOptions()
{
    for(let i=0;i<options.length;i++)
    {
        options[i].classList.remove("disabled","correct","wrong");
    }
}
function Validite()
{
    if(!options[0].classList.contains("disabled"))
    {
        alert("Please select one option")
    }
    else{
        enableOptions();
        randomQuestion();
    }
}

function next()
{
    Validite();
}

function randomQuestion(){
    let randomNumber=Math.floor(Math.random()*questions.length);
    let hitDuplicate
    if(index==questions.length)
    {
        console.log("Quiz Over")
        quizOver();
    }
    else{
        if(myArray.length>0)
        {
            for(let i=0;i<myArray.length;i++)
            {
                if(myArray[i]==randomNumber)
                {
                    hitDuplicate=1;
                    break;
                }
            }
            if(hitDuplicate==1)
            {
                randomQuestion();
            }
            else{
                questionIndex=randomNumber;
                load();
            }
        }
        if(myArray.length==0)
        {
            questionIndex=randomNumber;
            load();
        }
        
        myArray.push(randomNumber);
        }
    
}

function answerTracker()
{
    for(let i=0;i<questions.length-1;i++)
    {
        const div= document.createElement("div")
            answerTrackerContainer.appendChild(div);
    }
}
function updateAnswerTracker(classnam)
{
    answerTrackerContainer.children[index-1].classList.add(classnam);
}
function quizOver()
{
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML=score;
    totalQuestion2Span.innerHTML=questions.length;
    percentage.innerHTML=(score/questions.length)*100 +"%";
}

function tryAgain()
{
    window.location.reload();
}

window.onload = function(){
    this.randomQuestion();
    this.answerTracker();
}