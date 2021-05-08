const MINUTESPERHOUR = 60;
const SECONDSPERMINUTE = 60;
const MILLISECONDSPERSECOND = 1000;
let timerOriginal, timeLeft, endTime, timerInterval;

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
        h.toString().padStart(2, '0') + ':' +
        m.toString().padStart(2, '0') + ':' +
        s.toString().padStart(2, '0') + '.' +
        ms.toString().padStart(3, '0');
}

function timer(end_message) {
    document.getElementById("timerButton2").innerHTML = "Pause";
    document.getElementById("timerButton2").setAttribute( "onClick",
        "javascript: pauseTimer();" );
    endTime = Date.now() + timeLeft;
    timerInterval = setInterval(function() {
        timeLeft = endTime - Date.now();
        printTimeLeft(timeLeft);
        if (timeLeft < 0) {
            console.log(timeLeft);
            clearInterval(timerInterval);
            if (end_message) document.getElementById("messages").innerHTML = "Timer Done!";
            document.getElementById("timerButton2").innerHTML = "Reset";
            document.getElementById("timerButton2").setAttribute( "onClick",
                "javascript: resetTimer();" );
        }
    }, 1);
}

function startTimer() {
    // let input = document.getElementById("input");
    // console.log(typeof(parseInt(input.elements[0].value)),
    //     typeof(parseInt(input.elements[1].value)),
    //     typeof(parseInt(input.elements[2].value)));
    // timerOriginal = ((parseInt(input.elements[0].value) * MINUTESPERHOUR
    //     + parseInt(input.elements[1].value)) * SECONDSPERMINUTE
    //     + parseInt(input.elements[2].value)) * MILLISECONDSPERSECOND;
    // console.log(input.elements[0].value,
    //     input.elements[1].value,
    //     input.elements[2].value,
    //     input.elements[0].value * MINUTESPERHOUR + input.elements[1].value,
    //     (input.elements[0].value * MINUTESPERHOUR + input.elements[1].value)
    //     * SECONDSPERMINUTE + input.elements[2].value,
    //     timerOriginal);
    console.log(typeof(parseInt(document.getElementById("hours").elements[0].value)),
        typeof(parseInt(document.getElementById("minutes").elements[0].value)),
        typeof(parseInt(document.getElementById("seconds").elements[0].value)));
    timerOriginal = ((parseInt(document.getElementById("hours").elements[0].value) * MINUTESPERHOUR
        + parseInt(document.getElementById("minutes").elements[0].value)) * SECONDSPERMINUTE
        + parseInt(document.getElementById("seconds").elements[0].value)) * MILLISECONDSPERSECOND;
    console.log(document.getElementById("hours").elements[0].value,
        document.getElementById("minutes").elements[0].value,
        document.getElementById("seconds").elements[0].value,
        document.getElementById("hours").elements[0].value * MINUTESPERHOUR + document.getElementById("minutes").elements[0].value,
        (document.getElementById("hours").elements[0].value * MINUTESPERHOUR + document.getElementById("minutes").elements[0].value)
        * SECONDSPERMINUTE + document.getElementById("seconds").elements[0].value,
        timerOriginal);
    timeLeft = timerOriginal;
    printTimeLeft(timeLeft);
    timer(true);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timeLeft = endTime - Date.now();
    document.getElementById("timerButton1").innerHTML = "Resume";
    document.getElementById("timerButton1").setAttribute( "onClick",
        "javascript: startTimer(0, 0, 0, " + timeLeft.toString() + ", true);" );
    document.getElementById("timerButton2").innerHTML = "Reset";
    document.getElementById("timerButton2").setAttribute( "onClick",
        "javascript: resetTimer();" );
}

function resetTimer() {
    timeLeft = timerOriginal;
    printTimeLeft(timeLeft);
    document.getElementById("timerButton1").innerHTML = "Start";
    document.getElementById("timerButton1").setAttribute( "onClick",
        "javascript: timer(true);" );
    document.getElementById("timerButton2").innerHTML = "Pause";
    document.getElementById("timerButton2").setAttribute( "onClick", "" );
}


function pomodoro(pomodoroLength=25,
                  shortBreakLength=5,
                  longBreakLength=20,
                  pomodorosPerBlock=4,
                  numBlocks=2) {
    for (let i = 0; i < numBlocks; i++) {
        for (let j = 0; j < pomodorosPerBlock; j++) {
            document.write(`Start working! (${pomodoroLength} minutes)`);
            timer(minutes = pomodoroLength);
            if (j === pomodorosPerBlock - 1) break;
            document.write(`Break Time! (Short Break: ${shortBreakLength} minutes)`);
            timer(minutes = shortBreakLength);
            if (i === numBlocks - 1) break;
            document.write(`Pomodoro block done! Break Time! (Long Break: ${longBreakLength} minutes)`);
            timer(minutes = longBreakLength);
            document.write('All done your pomodoros! Great Job!');
        }
    }
}
