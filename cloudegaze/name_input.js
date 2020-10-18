//Store scores in decending order in the form of objects of name, min, sec
var highScores = [];

//Store the latest time result as an object of min and sec
var latestTime;
var amountOfHighScores = 10;

function createHighScoreList(valuesArray) {
    var highScoreList = document.createElement('ol');

    if (!(valuesArray == null)) {
        for (var i = 0; i < valuesArray.length; i++) {
            // Create the list item:
            var score = document.createElement('li');

            // Set its contents:
            score.appendChild(document.createTextNode(valuesArray[i].playerName + " " + valuesArray[i].timeMin + ":" + valuesArray[i].timeSec));

            // Add it to the list:
            highScoreList.appendChild(score);
        }
    }
    return highScoreList;

}

//Add values to the highscore list from local storage
function fetchLocalStoredHighScores() {
    var storedHighScoreList = [];
    var score;

    for (let i = 1; i <= amountOfHighScores; i++) {
        score = JSON.parse(window.localStorage.getItem(i));
        if (!(score == null)) {
            storedHighScoreList[i - 1] = score;
        }
    }

    highScores = storedHighScoreList;
}

//Show values in GUI
function populateHighScores() {
    fetchLocalStoredHighScores();
    document.getElementById("highScores").innerHTML = "";
    document.getElementById("highScores").appendChild(createHighScoreList(highScores));
}

//Store the new highscore list (currently purging the old storage)
function localStoreHighScores() {
    window.localStorage.clear();
    for (let i = 0; i < highScores.length; i++) {
        window.localStorage.setItem(i + 1, JSON.stringify(highScores[i]));
    }
}

//Make sure value is valid
function addToHighScoreList(name, timeSec, timeMin) {
    if (highScores.length <= amountOfHighScores) {
        highScores[highScores.length] = { playerName: name, timeMin: Number(1), timeSec: Number(timeSec) };
        highScores = insertionSort(highScores);
    } else if(highScores[9].timeMin * 60 + highScores[9].timeSec < timeMin*60 + timeSec){
        highScores[9] = { playerName: name, timeMin: Number(1), timeSec: Number(timeSec) };
        highScores = insertionSort(highScores);
    }

    //Make sure array is sorted with insertionSort
    function insertionSort(inputArr) {
        let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i - 1;
            while ((j > -1) && (current.timeMin * 60 + current.timeSec < inputArr[j].timeMin * 60 + inputArr[j].timeSec)) {
                inputArr[j + 1] = inputArr[j];
                j--;
            }
            // at this point we've exited, so j is either -1
            // or it's at the first element where current >= a[j]
            inputArr[j + 1] = current;
        }
        return inputArr;
    }
}

//Store highScores
function storeNewScore() {
    var input = document.getElementById("inputName").value;
    var timeSec = document.getElementById("timeSec").value;

    addToHighScoreList(input, timeSec, 1);
    localStoreHighScores();

    console.log("Nytt highscore added!" + highScores.length)
}