//Variable Declaration
let workMinutes = 25;
let workSeconds = 0;
let breakMinutes = 5;
let breakSeconds = 0;
let minutes = 25;
let seconds = 0;
let timerSetInterval;
let isBreak = false;
let hasSound = true;

const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const workElement = document.getElementById("work");
const breakElement = document.getElementById("break");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const settingsButton = document.getElementById("settings");
const closeButton = document.getElementById("close");
const wmInput = document.getElementById("workMinutes");
const wsInput = document.getElementById("workSeconds");
const bmInput = document.getElementById("breakMinutes");
const bsInput = document.getElementById("breakSeconds");
const muteCheck = document.getElementById("muteCheck");
const beep = new Audio("./beep.mp3");

//Update the Work/Break display
function updateMode() {
    if (isBreak) {
        workElement.style.background = "var(--el-color)";
        breakElement.style.background = "var(--hover-el-color)";
        workElement.style.color = "var(--unfocused-color)";
        breakElement.style.color = "white";
    } else {
        workElement.style.background = "var(--hover-el-color)";
        breakElement.style.background = "var(--el-color)";
        workElement.style.color = "white";
        breakElement.style.color = "var(--unfocused-color)";
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
    document.title = (isBreak ? "Break | " : "Work | ") + displayTime(minutes) + ":" + displayTime(seconds);
}

function switchMode() {
    if (hasSound) {
        beep.play();
    }
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
    [].forEach.call(document.getElementsByClassName("nonTimer"), function(el) {
        el.disabled = true;
        el.style.color = "var(--unfocused-color)";
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
    workElement.style.background = "var(--el-color)";
    breakElement.style.background = "var(--el-color)";
    workElement.style.color = "var(--unfocused-color)";
    breakElement.style.color = "var(--unfocused-color)";
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
    wmInput.value = (/^[0-9]*$/.test(wmInput.value)) ? displayTime(wmInput.value) : displayTime(workMinutes);
    workMinutes = (wmInput.value != 0) ? parseInt(wmInput.value, 10) : 0;
    minutes = workMinutes;
    updateTimer();
}

wsInput.oninput = function() {
    if (wsInput.value > 59) {
        wsInput.value = 59;
    }
    wsInput.value = (/^[0-9]*$/.test(wsInput.value)) ? displayTime(wsInput.value) : displayTime(workSeconds);
    workSeconds = (wsInput.value != 0) ? parseInt(wsInput.value, 10) : 0;
    seconds = workSeconds;
    updateTimer();
}

bmInput.oninput = function() {
    bmInput.value = (/^[0-9]*$/.test(bmInput.value)) ? displayTime(bmInput.value) : displayTime(breakMinutes);
    breakMinutes = (bmInput.value != 0) ? parseInt(bmInput.value, 10) : 0;
    updateTimer();
}

bsInput.oninput = function() {
    if (bsInput.value > 59) {
        bsInput.value = 59;
    }
    bsInput.value = (/^[0-9]*$/.test(bsInput.value)) ? displayTime(bsInput.value) : displayTime(breakSeconds);
    breakSeconds = (bsInput.value != 0) ? parseInt(bsInput.value, 10) : 0;
    updateTimer();
}

muteCheck.onchange = function() {
    hasSound = !hasSound;
}