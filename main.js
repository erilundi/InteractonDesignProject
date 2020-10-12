document.getElementById("stop").onclick = function() {myFunction()};

function change() {
    var btn = document.getElementById("stop");
   
    btn.innerHTML = "You got it!";

    webgazer.end();
}