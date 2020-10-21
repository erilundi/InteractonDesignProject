var foundStarCount = 0;
var numberOfStars = 2;
var stars = [];

window.onload = function randomizeStars() {
    //fetch all the stars
    var elem = document.getElementsByClassName('star');
    for (var i = 0; i < elem.length; i++) {
        stars[stars.length] = elem[i].id;
    }

    hideAllStars();
    showDesiredAmountOfStars();
    initializeDescription();
}

function getRandomNumber(max, min){
    return Math.floor(Math.random() * ((max-1) - min + 1)) + min;
}

function showDesiredAmountOfStars() {
    let NoOne = new Array();
    for (let i=0; i<stars.length; ++i) {
       NoOne.push(i);
    }
    NoOne = NoOne.sort(() => Math.random() - 0.5);

    if(numberOfStars <= stars.length){
        for (let i = 0; i < numberOfStars; i++) {
            showStar(stars[NoOne[i]]);   
        }
    }else{
        for (let i = 0; i < stars.length; i++) {
            showStar(stars[NoOne[i]]);   
        }
    }
}

function hideAllStars() {
    for (let i = 0; i < stars.length; i++) {
        hideStar(stars[i]);
    }
}

function initializeDescription() {
    document.getElementById("starsFound").innerText = "0/" + numberOfStars;
    document.getElementById("introText").innerText =  "Hitta " + numberOfStars + " stjärnor så snabbt som möjligt";
    document.getElementById("introText2").innerText =  "Hitta " + numberOfStars + " stjärnor så snabbt som möjligt";
}

function increseStarCounter() {
    foundStarCount++;
    document.getElementById("starsFound").innerText = foundStarCount + "/" + numberOfStars;
    if(foundStarCount == numberOfStars){
        stopTimer();
        window.location.href = "heatmap.html";
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
    document.getElementById("introText2").style.display = "none";
    window.sessionStorage.removeItem("stored")
}