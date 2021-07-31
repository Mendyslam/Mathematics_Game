//Declare a variable called playing
var playing = false;
var score;
var timeRemaining;
var begin;
var correctAnswer;

document.getElementById("startreset").onclick = function() {
    if(playing==true) {
        //if we are playing
        location.reload();
    }else {
        //if we are playing
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        document.getElementById("time").style.display = "block";
        document.getElementById("startreset").innerHTML = "Rest Game";

        //To start the count down
        timeRemaining = 60;
        startCount();
        generateQA();
        validate();
    }
}

//validate answer and increase score
for(i=1; i<5; i++) {
    document.getElementById("box" + i).onclick = function() {
        if(playing==true) {
            if(this.innerHTML == correctAnswer) {
                score += 1;
                document.getElementById("scorevalue").innerHTML = score;
                show("correct");
                hide("wrong");
                setTimeout(function() {
                    hide("correct");
                }, 1000);
                generateQA();
            }else {
                show("wrong");
                hide("correct");
                setTimeout(function() {
                    hide("wrong");
                }, 1000);
            };
        };
    };
};


//Funtion generate question and answer

function generateQA() {
    var first = 1 + Math.round(Math.random()*9);
    var second = 1 + Math.round(Math.random()*9);
    correctAnswer = first * second;
    document.getElementById("question").innerHTML = first + "x" + second;
    var answerBox = 1 + Math.round(Math.random()*3);
    document.getElementById("box" + answerBox).innerHTML = correctAnswer;
    var answer = [correctAnswer];
    for(i=1; i<5; i++) {
        if(i != answerBox) {
            var wrongAnswer;
            do{
                wrongAnswer = (1 + Math.round(Math.random()*9)) * (1 + Math.round(Math.random()*9));
            } while(answer.indexOf(wrongAnswer) > -1);
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answer.push(wrongAnswer);
        }
    }
}

//Function to begin count
function startCount() {
    begin = setInterval(function() {
        timeRemaining -= 1;
        document.getElementById("timevalue").innerHTML = timeRemaining;
        if(timeRemaining == 0) {
            stopCount();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your score is " + score + "</p>";
            hide("correct");
            hide("wrong");
            hide("time");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
            document.getElementById("question").innerHTML = "";
            for(i=1; i<5; i++) {
                document.getElementById("box" + i).innerHTML = "";
            };
        };
    }, 1000);
};

//Function to stop count
function stopCount() {
    clearInterval(begin);
}

//function show
function show(id) {
    document.getElementById(id).style.display = "block"
};

//function hide
function hide(id) {
    document.getElementById(id).style.display = "none"
};
