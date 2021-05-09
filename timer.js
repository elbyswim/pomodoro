const MINUTESPERHOUR = 60;
const SECONDSPERMINUTE = 60;
const MILLISECONDSPERSECOND = 1000;
let timeLeft, endTime, timerInterval;

function printTimeLeft() {
    let t = timeLeft;
    let h = 0, m = 0, s = 0, ms = 0;
    if (t > 0) {
        ms = t % MILLISECONDSPERSECOND;
        t = Math.floor(t / MILLISECONDSPERSECOND);
        s = t % SECONDSPERMINUTE;
        t = Math.floor(t / SECONDSPERMINUTE);
        m = t % MINUTESPERHOUR;
        t = Math.floor(t / MINUTESPERHOUR);
        h = t;
    }
    document.getElementById("clock").innerHTML =
        'Clock: ' +
        h.toString().padStart(2, '0') + ':' +
        m.toString().padStart(2, '0') + ':' +
        s.toString().padStart(2, '0') + '.' +
        ms.toString().padStart(3, '0');
}

function timer() {
    document.getElementById("messages").innerHTML = "Timer Started!";
    document.getElementById("timerButton1").innerHTML = "Pause";
    document.getElementById("timerButton1").setAttribute( "onClick",
        "javascript: pauseTimer();" );
    document.getElementById("timerButton2").setAttribute( "onClick",
        "javascript: resetTimer();" );
    endTime = Date.now() + timeLeft;
    timerInterval = setInterval(function() {
        timeLeft = endTime - Date.now();
        printTimeLeft(timeLeft);
        if (timeLeft < 0) {
            console.log(timeLeft);
            clearInterval(timerInterval);
            document.getElementById("messages").innerHTML = "Timer Done!";
            setTimer();
        }
    }, 1);
}

function setTimer() {
    timeLeft = ((parseInt(document.getElementById("hours").elements[0].value) * MINUTESPERHOUR
        + parseInt(document.getElementById("minutes").elements[0].value)) * SECONDSPERMINUTE
        + parseInt(document.getElementById("seconds").elements[0].value)) * MILLISECONDSPERSECOND;
    if (timeLeft === 0) document.getElementById("messages").innerHTML = "Please set a time.";
    printTimeLeft(timeLeft);
    document.getElementById("timerButton1").innerHTML = "Start";
    document.getElementById("timerButton1").setAttribute( "onClick",
        "javascript: startTimer();" );
}

function startTimer() {
    setTimer();
    timer();
}

function pauseTimer() {
    clearInterval(timerInterval);
    document.getElementById("messages").innerHTML = "Timer Paused.";
    timeLeft = endTime - Date.now();
    document.getElementById("timerButton1").innerHTML = "Resume";
    document.getElementById("timerButton1").setAttribute( "onClick",
        "javascript: timer();" );
    document.getElementById("timerButton2").setAttribute( "onClick",
        "javascript: resetTimer();" );
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById("messages").innerHTML = "Timer cancelled.";
    setTimer();
    document.getElementById("timerButton1").innerHTML = "Start";
    document.getElementById("timerButton1").setAttribute( "onClick",
        "javascript: startTimer();" );
    document.getElementById("timerButton2").setAttribute( "onClick", "" );
}



