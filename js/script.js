//Variable Declaration, with local storage for editable fields
let workMinutes = (localStorage.getItem("workMinutes") === null) ? 25 : parseInt(localStorage.getItem("workMinutes"));
let workSeconds = (localStorage.getItem("workSeconds") === null) ? 0 : parseInt(localStorage.getItem("workSeconds"));
let breakMinutes = (localStorage.getItem("breakMinutes") === null) ? 5 : parseInt(localStorage.getItem("breakMinutes"));
let breakSeconds = (localStorage.getItem("breakSeconds") === null) ? 0 : parseInt(localStorage.getItem("breakSeconds"));
let minutes = workMinutes;
let seconds = workSeconds;
let workTime;
let breakTime;
let timerSetInterval;
let isBreak = false;
let hasSound = true;
if (localStorage.getItem("mute") != null) {
    hasSound = (localStorage.getItem("mute") == "0") ? false : true;
}

const MINUTES_ELEM = document.getElementById("minutes");
const SECONDS_ELEM = document.getElementById("seconds");
const WORK_ELEM = document.getElementById("work");
const BREAK_ELEM = document.getElementById("break");
const START_BUTTON = document.getElementById("start");
const RESET_BUTTON = document.getElementById("reset");
const SETTINGS_BUTTON = document.getElementById("settings");
const CLOSE_BUTTON = document.getElementById("close");
const WORK_M_INPUT = document.getElementById("workMinutes");
const WORK_S_INPUT = document.getElementById("workSeconds");
const BREAK_M_INPUT = document.getElementById("breakMinutes");
const BREAK_S_INPUT = document.getElementById("breakSeconds");
const SOUND_BOX = document.getElementById("muteCheck");
const TIMER_CIRCLE = document.getElementById("timerCircle");
const BEEP_SOUND = new Audio("./beep.mp3");

WORK_M_INPUT.value = displayTime(workMinutes);
WORK_S_INPUT.value = displayTime(workSeconds);
BREAK_M_INPUT.value = displayTime(breakMinutes);
BREAK_S_INPUT.value = displayTime(breakSeconds);

//Update the Work/Break display
function updateMode() {
    if (isBreak) {
        WORK_ELEM.style.background = "var(--el-color)";
        BREAK_ELEM.style.background = "var(--hover-el-color)";
        WORK_ELEM.style.color = "var(--unfocused-color)";
        BREAK_ELEM.style.color = "white";
    } else {
        WORK_ELEM.style.background = "var(--hover-el-color)";
        BREAK_ELEM.style.background = "var(--el-color)";
        WORK_ELEM.style.color = "white";
        BREAK_ELEM.style.color = "var(--unfocused-color)";
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

//Display the right time and update the timer circle percentage
function updateTimer() {
    MINUTES_ELEM.innerHTML = displayTime(minutes);
    SECONDS_ELEM.innerHTML = displayTime(seconds);
    document.title = "Pomodoro | " + displayTime(minutes) + ":" + displayTime(seconds) + (isBreak ? " | Break" : " | Work");
}

//Change from Work to Break and the other way around
function switchMode() {
    if (hasSound) {
        BEEP_SOUND.play();
    }
    minutes = isBreak ? workMinutes : breakMinutes;
    seconds = isBreak ? workSeconds : breakSeconds;
    updateTimer();
    isBreak = !isBreak;
    updateMode();
    if (minutes == 0 && seconds == 0) {
        switchMode();
    }
    TIMER_CIRCLE.style.animation = "none";
    TIMER_CIRCLE.offsetHeight;
    TIMER_CIRCLE.style.animation = (isBreak ? breakTime : workTime) + "s animate linear";
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

//Start the timer and replace the start button with the reset one
function startTimer() {
    timerSetInterval = setInterval(timerRunning, 1000);
    workTime = workMinutes * 60 + workSeconds;
    breakTime = breakMinutes * 60 + breakSeconds;
    TIMER_CIRCLE.style.animation = (isBreak ? breakTime : workTime) + "s animate linear";
    RESET_BUTTON.style.display = "none";
    RESET_BUTTON.style.display = "initial";
    START_BUTTON.replaceWith(RESET_BUTTON);
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
    isBreak = false;
    updateTimer();
    RESET_BUTTON.replaceWith(START_BUTTON);
    clearInterval(timerSetInterval);
    TIMER_CIRCLE.style.removeProperty("animation");
    WORK_ELEM.style.background = "var(--el-color)";
    BREAK_ELEM.style.background = "var(--el-color)";
    WORK_ELEM.style.color = "var(--unfocused-color)";
    BREAK_ELEM.style.color = "var(--unfocused-color)";
    [].forEach.call(document.getElementsByClassName("nonTimer"), function(el) {
        el.disabled = false;
        el.style.color = "white";
    });
}

//Settings panel implementation
SETTINGS_BUTTON.onclick = function() {
    opacityDiv.style.display = "initial";
    settingsContainer.style.display = "initial";
}

CLOSE_BUTTON.onclick = function() {
    opacityDiv.style.display = "none";
    settingsContainer.style.display = "none";  
}

//TIME INPUTS

WORK_M_INPUT.oninput = function() {
    WORK_M_INPUT.value = (/^[0-9]*$/.test(WORK_M_INPUT.value)) ? displayTime(WORK_M_INPUT.value) : displayTime(workMinutes);
    workMinutes = (WORK_M_INPUT.value != 0) ? parseInt(WORK_M_INPUT.value, 10) : 0;
    minutes = workMinutes;
    localStorage.setItem("workMinutes", workMinutes.toString());
    updateTimer();
}

WORK_S_INPUT.oninput = function() {
    if (WORK_S_INPUT.value > 59) {
        WORK_S_INPUT.value = 59;
    }
    WORK_S_INPUT.value = (/^[0-9]*$/.test(WORK_S_INPUT.value)) ? displayTime(WORK_S_INPUT.value) : displayTime(workSeconds);
    workSeconds = (WORK_S_INPUT.value != 0) ? parseInt(WORK_S_INPUT.value, 10) : 0;
    seconds = workSeconds;
    localStorage.setItem("workSeconds", workSeconds.toString());
    updateTimer();
}

BREAK_M_INPUT.oninput = function() {
    BREAK_M_INPUT.value = (/^[0-9]*$/.test(BREAK_M_INPUT.value)) ? displayTime(BREAK_M_INPUT.value) : displayTime(breakMinutes);
    breakMinutes = (BREAK_M_INPUT.value != 0) ? parseInt(BREAK_M_INPUT.value, 10) : 0;
    localStorage.setItem("breakMinutes", breakMinutes.toString());
    updateTimer();
}

BREAK_S_INPUT.oninput = function() {
    if (BREAK_S_INPUT.value > 59) {
        BREAK_S_INPUT.value = 59;
    }
    BREAK_S_INPUT.value = (/^[0-9]*$/.test(BREAK_S_INPUT.value)) ? displayTime(BREAK_S_INPUT.value) : displayTime(breakSeconds);
    breakSeconds = (BREAK_S_INPUT.value != 0) ? parseInt(BREAK_S_INPUT.value, 10) : 0;
    updateTimer();
    localStorage.setItem("breakSeconds", breakSeconds.toString());
}

//Safecheck to prevent 00:00 time
Array.prototype.forEach.call(document.getElementsByClassName("nonTimer"), function(el) {
    el.onchange = function() {
        if (WORK_M_INPUT.value == "00" && WORK_S_INPUT.value == "00") {
            WORK_S_INPUT.value = displayTime(1);
            workSeconds = 1;
            seconds = 1;
        }
        if (BREAK_M_INPUT.value == "00" && BREAK_S_INPUT.value == "00") {
            BREAK_S_INPUT.value = displayTime(1);
            breakSeconds = 1;
        }
        updateTimer();
    }
});

//Disable Sound
SOUND_BOX.onchange = function() {
    hasSound = !hasSound;
    localStorage.setItem("mute", hasSound ? "1" : "0");
}

updateTimer();