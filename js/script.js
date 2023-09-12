let minutes = 0;
let seconds = 3;

document.getElementById("minutes").innerHTML = minutes
document.getElementById("seconds").innerHTML = seconds

function timerRunning() {
    seconds--;
    if (seconds < 0) {
        minutes--;
        seconds = 59;
    }
    document.getElementById("minutes").innerHTML = minutes
    document.getElementById("seconds").innerHTML = seconds
    if (minutes == 0 && seconds == 0) {
        document.getElementById("timerCircle").innerHTML = "<i class='fa-solid fa-clock fa-shake'></i>";
    }
}

setInterval(timerRunning, 1000)