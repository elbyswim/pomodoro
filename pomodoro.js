const MINUTESPERHOUR = 60;
const SECONDSPERMINUTE = 60;
const MILLISECONDSPERSECOND = 1000;
let timeLeft, endTime, timerInterval;
let work, short, long, blockLength, blocksLeft, pomodorosLeft, state, paused;


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

function printCounter() {
    document.getElementById("counter").innerHTML =
        "Blocks Left: " + blocksLeft + ". " +
        "Pomodoros left in this block: " + pomodorosLeft + "."
}

function printState() {
    let msg;
    if (state === 'work') {
        msg = 'Work';
    } else if (state === 'short') {
        msg = 'Short Break';
    } else if (state === 'long') {
        msg = 'Long Break'
    } else if (state === 'done') {
        msg = 'Done'
    }
    document.getElementById("state").innerHTML =
        "Current interval: " + msg;
}

function pomodoro() {
    printCounter();
    printState();
    if (state === 'done') {
        setPomodoro();
        return;
    }
    document.getElementById("timerButton1").innerHTML = "Pause";
    document.getElementById("timerButton1").setAttribute( "onClick",
        "javascript: pausePomodoro();" );
    document.getElementById("timerButton2").setAttribute( "onClick",
        "javascript: resetPomodoro();" );
    if (paused) {
      paused = false;
    } else {
        if (state === 'work') {
            timeLeft = work;
        } else if (state === 'short') {
            timeLeft = short;
        } else if (state === 'long') {
            timeLeft = long;
        }
    }
    endTime = Date.now() + timeLeft;
    timerInterval = setInterval(function() {
        timeLeft = endTime - Date.now();
        printTimeLeft(timeLeft);
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            if (state === 'work') {
                if (pomodorosLeft > 1) {
                    state = 'short';
                    pomodorosLeft -= 1;
                } else if (blocksLeft > 1) {
                    state = 'long';
                    blocksLeft -= 1;
                    pomodorosLeft = blockLength;
                } else {
                    state = 'done';
                    pomodorosLeft -= 1;
                    blocksLeft -= 1;
                }
            } else {
                state = 'work'
            }
            pomodoro();
        }
    }, 1);
}

function setPomodoro() {
    work = ((parseInt(document.getElementById("work").elements[0].value) * MINUTESPERHOUR
        + parseInt(document.getElementById("work").elements[1].value)) * SECONDSPERMINUTE
        + parseInt(document.getElementById("work").elements[2].value)) * MILLISECONDSPERSECOND;
    short = ((parseInt(document.getElementById("short").elements[0].value) * MINUTESPERHOUR
        + parseInt(document.getElementById("short").elements[1].value)) * SECONDSPERMINUTE
        + parseInt(document.getElementById("short").elements[2].value)) * MILLISECONDSPERSECOND;
    long = ((parseInt(document.getElementById("long").elements[0].value) * MINUTESPERHOUR
        + parseInt(document.getElementById("long").elements[1].value)) * SECONDSPERMINUTE
        + parseInt(document.getElementById("long").elements[2].value)) * MILLISECONDSPERSECOND;
    blockLength = parseInt(document.getElementById("blockLength").elements[0].value);
    blocksLeft = parseInt(document.getElementById("numBlocks").elements[0].value);
    if (work === 0) {
        document.getElementById("messages").innerHTML = "Please set a pomodoro duration.";
        return false;
    } else if (short === 0 && blockLength > 1) {
        document.getElementById("messages").innerHTML = "Please set a short break duration.";
        return false;
    } else if (long === 0) {
        document.getElementById("messages").innerHTML = "Please set a long break duration.";
        return false;
    } else if (blockLength === 0) {
        document.getElementById("messages").innerHTML = "Please set the number of pomodoros per block.";
        return false;
    } else if (blocksLeft === 0) {
        document.getElementById("messages").innerHTML = "Please set the number of blocks.";
        return false;
    }
    pomodorosLeft = blockLength;
    paused = false;
    return true;
}

function startPomodoro() {
    if (setPomodoro()) {
        state = 'work';
        document.getElementById("messages").innerHTML = "Timer Started!";
        pomodoro();
    }
}

function pausePomodoro() {
    clearInterval(timerInterval);
    paused = true;
    document.getElementById("messages").innerHTML = "Pomodoro Paused.";
    timeLeft = endTime - Date.now();
    document.getElementById("timerButton1").innerHTML = "Resume";
    document.getElementById("timerButton1").setAttribute( "onClick",
        "javascript: pomodoro();" );
    document.getElementById("timerButton2").setAttribute( "onClick",
        "javascript: resetPomodoro();" );
}

function resetPomodoro() {
    clearInterval(timerInterval);
    document.getElementById("messages").innerHTML = "Pomodoro cancelled.";
    setPomodoro();
    printCounter();
    state = 'done';
    printState();
    timeLeft = 0;
    printTimeLeft();
    document.getElementById("timerButton1").innerHTML = "Start";
    document.getElementById("timerButton1").setAttribute( "onClick",
        "javascript: startPomodoro();" );
    document.getElementById("timerButton2").setAttribute( "onClick", "" );
}