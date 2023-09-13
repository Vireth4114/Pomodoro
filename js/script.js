let minutes = 25;
let seconds = 0;

function displayTime(time) {
    let timeString = time.toString();
    let formattedString = time < 10 ? "0" + timeString : timeString;
    return formattedString;
}

document.getElementById("minutes").innerHTML = displayTime(minutes);
document.getElementById("seconds").innerHTML = displayTime(seconds);

function timerRunning() {
    seconds--;
    if (seconds < 0) {
        minutes--;
        seconds = 59;
    }
    document.getElementById("minutes").innerHTML = displayTime(minutes)
    document.getElementById("seconds").innerHTML = displayTime(seconds)
    if (minutes == 0 && seconds == 0) {
        document.getElementById("timerCircle").innerHTML = "<i class='fa-solid fa-clock fa-shake'></i>";
    }
}

startButton = document.getElementById("start");
resetButton = document.getElementById("reset");

startButton.onclick = function() {
    setInterval(timerRunning, 1000);resetButton.style.display = "none";
    resetButton.style.display = "initial";
    startButton.replaceWith(resetButton);
};

resetButton.onclick = function() {
    location.reload();
}