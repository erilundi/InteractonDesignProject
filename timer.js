//Store the latest time result as an object of min and sec
var scoreTime;
var secondsTimer = 0;

var startTime, endTime;

function startTimer() {
    startTime = new Date();
}

function stopTimer() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds 
    secondsTimer = Math.round(timeDiff);

    //calculate scoretime
    scoreTime = { timeMin: Math.floor(secondsTimer/60), timeSec: secondsTimer % 60 }

    window.sessionStorage.setItem("time", JSON.stringify(scoreTime));
}


function getTime(){
    return JSON.parse(window.sessionStorage.getItem("time"));
}

