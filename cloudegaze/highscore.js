//Store scores in decending order in the form of objects of name, min, sec
var highScores = [];

var amountOfHighScores = 10;


//Creates a html list to be presented
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

//Store the new highscore list by removing the old and adding the new
function localStoreHighScores() {
    for (let i = 0; i < highScores.length; i++) {
        window.localStorage.removeItem(i);
    }
    for (let i = 0; i < highScores.length; i++) {
        window.localStorage.setItem(i + 1, JSON.stringify(highScores[i]));
    }
}

//Make sure value is valid
function addToHighScoreList(name, timeMin, timeSec) {
    if (highScores.length < amountOfHighScores) {
        highScores[highScores.length] = { playerName: name, timeMin: Number(timeMin), timeSec: Number(timeSec) };
        highScores = insertionSort(highScores);
    } else if (highScores[9].timeMin * 60 + highScores[9].timeSec < timeMin * 60 + timeSec) {
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
    var stored = false;
    stored = window.sessionStorage.getItem("stored");
    if (!stored) {
        var input = document.getElementById("inputName").value;

        if (!(input == "")) {
            addToHighScoreList(input, getTime().timeMin, getTime().timeSec);
            localStoreHighScores();
        }
        
        window.sessionStorage.setItem("stored", "true");
        document.getElementById("saveButton").style.fill = "#9E9E9E";
        document.getElementById("saveButtonText").style.fill = "#D0D0D0";
        document.getElementById("saveButtonText").style.cursor = "default";
        document.getElementById("saveButton").style.cursor = "default";
        document.getElementById("inputName").value = "";
        document.getElementById("inputName").placeholder = "Sparat!";
        document.getElementById("inputName").disabled = true;
    }
}

function checkStored() {
    var stored = false;
    stored = window.sessionStorage.getItem("stored");
    if (stored) {
        document.getElementById("saveButtonText").style.display= "none";
        document.getElementById("saveButton").style.display= "none";
        document.getElementById("inputName").style.display= "none";
    }
}
