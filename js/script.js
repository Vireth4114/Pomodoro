//Variable Declaration
let workMinutes = (localStorage.getItem("workMinutes") === null) ? 25 : parseInt(localStorage.getItem("workMinutes"));
let workSeconds = (localStorage.getItem("workSeconds") === null) ? 0 : parseInt(localStorage.getItem("workSeconds"));
let breakMinutes = (localStorage.getItem("breakMinutes") === null) ? 5 : parseInt(localStorage.getItem("breakMinutes"));
let breakSeconds = (localStorage.getItem("breakSeconds") === null) ? 0 : parseInt(localStorage.getItem("breakSeconds"));
console.log(breakMinutes);
let minutes = workMinutes;
let seconds = workSeconds;
let timerSetInterval;
let isBreak = false;
let hasSound = true;
if (localStorage.getItem("mute") != null) {
    hasSound = (localStorage.getItem("mute") == "0") ? false : true;
}

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

wmInput.value = displayTime(workMinutes);
wsInput.value = displayTime(workSeconds);
bmInput.value = displayTime(breakMinutes);
bsInput.value = displayTime(breakSeconds);

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
    [].forEach.call(document.getElementsByClassName("nonTimer"), function(el) {
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
    localStorage.setItem("workMinutes", workMinutes.toString());
    updateTimer();
}

wsInput.oninput = function() {
    if (wsInput.value > 59) {
        wsInput.value = 59;
    }
    wsInput.value = (/^[0-9]*$/.test(wsInput.value)) ? displayTime(wsInput.value) : displayTime(workSeconds);
    workSeconds = (wsInput.value != 0) ? parseInt(wsInput.value, 10) : 0;
    seconds = workSeconds;
    localStorage.setItem("workSeconds", workSeconds.toString());
    updateTimer();
}

bmInput.oninput = function() {
    bmInput.value = (/^[0-9]*$/.test(bmInput.value)) ? displayTime(bmInput.value) : displayTime(breakMinutes);
    breakMinutes = (bmInput.value != 0) ? parseInt(bmInput.value, 10) : 0;
    localStorage.setItem("breakMinutes", breakMinutes.toString());
    updateTimer();
}

bsInput.oninput = function() {
    if (bsInput.value > 59) {
        bsInput.value = 59;
    }
    bsInput.value = (/^[0-9]*$/.test(bsInput.value)) ? displayTime(bsInput.value) : displayTime(breakSeconds);
    breakSeconds = (bsInput.value != 0) ? parseInt(bsInput.value, 10) : 0;
    updateTimer();
    localStorage.setItem("breakSeconds", breakSeconds.toString());
}

muteCheck.onchange = function() {
    hasSound = !hasSound;
    localStorage.setItem("mute", hasSound ? "1" : "0");
}

