let timing = document.getElementById("timing");
let seconds = 0, minutes = 0, hours = 0;
let t;

/**This function starts the timer and increments it */
function startWatch() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    timing.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    
    startTimer();
}


function startTimer() {
    t = setTimeout(startWatch, 1000);
}



// timer();
function timerControl(){

        startTimer();
        deck.removeEventListener("click", timerControl)

}

deck.addEventListener("click", timerControl);

// stopTimer()

function resetTime() {
    const timing = document.querySelector("#timing");
    clearTimeout(t);
    timing.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    deck.addEventListener("click", timerControl);
}