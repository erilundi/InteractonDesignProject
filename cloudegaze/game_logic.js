var foundStarCount = 0;
var numberOfStars = 1;
var stars = [];

window.onload = function randomizeStars() {
    //fetch all the stars
    var elem = document.getElementsByClassName('star');
    for (var i = 0; i < elem.length; i++) {
        stars[stars.length] = elem[i].id;
    }

    //hideAllStars();
    showDesiredAmountOfStars();
    initializeStarCounter();
}

function showDesiredAmountOfStars() {
    var randomnumber = 0;
    for (let i = 0; i <= numberOfStars; i++) {
        randomnumber = Math.floor(Math.random() * ((numberOfStars-1) - 0 + 1)) + 0;
        showStar(stars[randomnumber])
    }
}

function hideAllStars() {
    for (let i = 0; i <= stars.length; i++) {
        hideStar(stars[i]);
    }
}

function initializeStarCounter() {
    document.getElementById("starsFound").innerText = "0/" + numberOfStars;
}

function increseStarCounter() {
    foundStarCount++;
    document.getElementById("starsFound").innerText = foundStarCount + "/" + numberOfStars;
    if(foundStarCount == numberOfStars){
        //stopTimer();
        window.location.href = "highscore.html";
    }
}

function toggleStarDisplay(starId) {
    var style = document.getElementById(starId).style.display;
    if (style === "none") {
        document.getElementById(starId).style.display = "block";
    } else {
        document.getElementById(starId).style.display = "none";
    }
}

function showStar(starId) {
        document.getElementById(starId).style.display = "block";
}

function hideStar(starId) {
        document.getElementById(starId).style.display = "none";
}

function removeDescription(){
    document.getElementById("description").style.display = "none";
    document.getElementById("descriptionWhite").style.display = "none";
}