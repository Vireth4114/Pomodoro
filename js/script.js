let minutes = 25;
let seconds = 0;
let timerSetInterval;
let isPause = false;

let minutesElement = document.getElementById("minutes");
let secondsElement = document.getElementById("seconds");
let workElement = document.getElementById("work");
let pauseElement = document.getElementById("pause");


function displayTime(time) {
    let timeString = time.toString();
    let formattedString = time < 10 ? "0" + timeString : timeString;
    return formattedString;
}

function updateTimer() {
    minutesElement.innerHTML = displayTime(minutes);
    secondsElement.innerHTML = displayTime(seconds);
}

function updateMode() {
    if (isPause) {
        workElement.style.background = "#102030";
        pauseElement.style.background = "#081018";
        workElement.style.color = "#606060";
        pauseElement.style.color = "white";
    } else {
        workElement.style.background = "#081018";
        pauseElement.style.background = "#102030";
        workElement.style.color = "white";
        pauseElement.style.color = "#606060";
    }
}

updateTimer();

function timerRunning() {
    seconds--;
    if (seconds < 0) {
        minutes--;
        seconds = 59;
    }
    updateTimer();
    if (minutes == 0 && seconds == 0) {
        minutes = isPause ? 25 : 1;
        seconds = 0;
        updateTimer();
        isPause = !isPause;
        updateMode();
    }
}

startButton = document.getElementById("start");
resetButton = document.getElementById("reset");

startButton.onclick = function() {
    timerSetInterval = setInterval(timerRunning, 1000);resetButton.style.display = "none";
    resetButton.style.display = "initial";
    startButton.replaceWith(resetButton);
    isPause = false;
    updateMode();
};

resetButton.onclick = function() {
    minutes = 25;
    seconds = 0;
    updateTimer();
    resetButton.replaceWith(startButton);
    clearInterval(timerSetInterval);
    workElement.style.background = "#102030";
    pauseElement.style.background = "#102030";
    workElement.style.color = "#606060";
    pauseElement.style.color = "#606060";
}