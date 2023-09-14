//Variable Declaration
let minutes = 25;
let seconds = 0;
let timerSetInterval;
let isBreak = false;

let minutesElement = document.getElementById("minutes");
let secondsElement = document.getElementById("seconds");
let workElement = document.getElementById("work");
let breakElement = document.getElementById("break");
let startButton = document.getElementById("start");
let resetButton = document.getElementById("reset");

//Update the Work/Break display
function updateMode() {
    if (isBreak) {
        workElement.style.background = "#102030";
        breakElement.style.background = "#081018";
        workElement.style.color = "#606060";
        breakElement.style.color = "white";
    } else {
        workElement.style.background = "#081018";
        breakElement.style.background = "#102030";
        workElement.style.color = "white";
        breakElement.style.color = "#606060";
    }
}

//Add a leading 0 if the time is too short
function displayTime(time) {
    let timeString = time.toString();
    let formattedString = time < 10 ? "0" + timeString : timeString;
    return formattedString;
}

//Display the right time
function updateTimer() {
    minutesElement.innerHTML = displayTime(minutes);
    secondsElement.innerHTML = displayTime(seconds);
}

//Ran every second, decrements the timer and switch the mode accordingly
function timerRunning() {
    seconds--;
    if (seconds < 0) {
        minutes--;
        seconds = 59;
    }
    updateTimer();

    if (minutes == 0 && seconds == 0) {
        minutes = isBreak ? 25 : 5;
        seconds = 0;
        updateTimer();
        isBreak = !isBreak;
        updateMode();
    }
}

updateTimer();

//Start the timer and replace the start button with the reset one
startButton.onclick = function() {
    timerSetInterval = setInterval(timerRunning, 1000);resetButton.style.display = "none";
    resetButton.style.display = "initial";
    startButton.replaceWith(resetButton);
    isBreak = false;
    updateMode();
};

//Reset everything without reloading the page entirely
resetButton.onclick = function() {
    minutes = 25;
    seconds = 0;
    updateTimer();
    resetButton.replaceWith(startButton);
    clearInterval(timerSetInterval);
    workElement.style.background = "#102030";
    breakElement.style.background = "#102030";
    workElement.style.color = "#606060";
    breakElement.style.color = "#606060";
}