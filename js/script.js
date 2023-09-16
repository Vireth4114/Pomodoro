//Variable Declaration
let workMinutes = 25;
let workSeconds = 0;
let breakMinutes = 5;
let breakSeconds = 0;
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
let settingsButton = document.getElementById("settings");
let closeButton = document.getElementById("close");
let wmInput = document.getElementById("workMinutes");
let wsInput = document.getElementById("workSeconds");
let bmInput = document.getElementById("breakMinutes");
let bsInput = document.getElementById("breakSeconds");

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
    let formattedString = timeString.length <= 1 ? "0" + timeString : timeString;
    if (formattedString.length > 2 && formattedString[0] == "0") {
        formattedString = formattedString.substring(1);
    }
    return formattedString;
}

//Display the right time
function updateTimer() {
    minutesElement.innerHTML = displayTime(minutes);
    secondsElement.innerHTML = displayTime(seconds);
}

function switchMode() {
    minutes = isBreak ? workMinutes : breakMinutes;
    seconds = isBreak ? workSeconds : breakSeconds;
    updateTimer();
    isBreak = !isBreak;
    updateMode();
    if (minutes == 0 && seconds == 0) {
        switchMode();
    }
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
        switchMode();
    }
}

updateTimer();


//Start the timer and replace the start button with the reset one
function startTimer() {
    timerSetInterval = setInterval(timerRunning, 1000);
    resetButton.style.display = "none";
    resetButton.style.display = "initial";
    startButton.replaceWith(resetButton);
    isBreak = false;
    updateMode();
    [].forEach.call(document.getElementsByTagName("input"), function(el) {
        el.disabled = true;
        el.style.color = "#606060";
    });
    if (minutes == 0 && seconds == 0) {
        switchMode();
    }
};

//Reset everything without reloading the page entirely
function stopTimer() {
    minutes = workMinutes;
    seconds = workSeconds;
    updateTimer();
    resetButton.replaceWith(startButton);
    clearInterval(timerSetInterval);
    workElement.style.background = "#102030";
    breakElement.style.background = "#102030";
    workElement.style.color = "#606060";
    breakElement.style.color = "#606060";
    [].forEach.call(document.getElementsByTagName("input"), function(el) {
        el.disabled = false;
        el.style.color = "white";
    });
}

settingsButton.onclick = function() {
    opacityDiv.style.display = "initial";
    settingsContainer.style.display = "initial";
}

closeButton.onclick = function() {
    opacityDiv.style.display = "none";
    settingsContainer.style.display = "none";
}

wmInput.oninput = function() {
    wmInput.value = displayTime(wmInput.value);
    workMinutes = (wmInput.value != 0) ? parseInt(wmInput.value, 10) : 0;
    minutes = workMinutes;
    updateTimer();
}

wsInput.oninput = function() {
    if (wsInput.value > 59) {
        wsInput.value = 59;
    }
    wsInput.value = displayTime(wsInput.value);
    workSeconds = (wsInput.value != 0) ? parseInt(wsInput.value, 10) : 0;
    seconds = workSeconds;
    updateTimer();
}

bmInput.oninput = function() {
    bmInput.value = displayTime(bmInput.value);
    breakMinutes = (bmInput.value != 0) ? parseInt(bmInput.value, 10) : 0;
    updateTimer();
}

bsInput.oninput = function() {
    if (bsInput.value > 59) {
        bsInput.value = 59;
    }
    bsInput.value = displayTime(bsInput.value);
    breakSeconds = (bsInput.value != 0) ? parseInt(bsInput.value, 10) : 0;
    updateTimer();
}