const MINUTESPERHOUR = 60;
const SECONDSPERMINUTE = 60;
const MILLISECONDSPERSECOND = 1000;
let timeLeft, endTime, timerInterval;
let work, short, long, blockLength, blocksLeft, pomodorosLeft;


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

function printStatus(status) {
    document.getElementById("status").innerHTML =
        "Current interval: " + status
}

function pomodoro() {
    document.getElementById("messages").innerHTML = "Timer Started!";
    document.getElementById("timerButton1").innerHTML = "Pause";
    document.getElementById("timerButton1").setAttribute( "onClick",
        "javascript: pausePomodoro();" );
    document.getElementById("timerButton2").setAttribute( "onClick",
        "javascript: resetTimer();" );
    while (blocksLeft > 0) {
        pomodorosLeft = blockLength;
        while (pomodorosLeft > 0) {
            printCounter();
            endTime = Date.now() + work;
            console.log('work');
            printStatus('Work');
            let flag1 = true;
            timerInterval = setInterval(function() {
                if (flag1) {
                    console.log(1)
                    flag1 = false
                }
                timeLeft = endTime - Date.now();
                printTimeLeft(timeLeft);
                if (timeLeft < 0) {
                    clearInterval(timerInterval);
                }
            }, 1);
            if (pomodorosLeft > 1) {
                console.log('short');
                printStatus('Short Break');
                endTime = Date.now() + short;
            } else if (blocksLeft > 1) {
                console.log('long');
                printStatus('Long Break');
                endTime = Date.now() + long;
            }
            flag1 = true;
            timerInterval = setInterval(function() {
                if (flag1) {
                    console.log(2)
                    flag1 = false
                }
                timeLeft = endTime - Date.now();
                printTimeLeft(timeLeft);
                if (timeLeft < 0) {
                    clearInterval(timerInterval);
                }
            }, 1);
            pomodorosLeft -= 1;
        }
        blocksLeft -= 1;
        pomodorosLeft = blockLength;
    }
    printStatus('No more!');
    printCounter();
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
    } else if (short === 0) {
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
    return true;
}

function startPomodoro() {
    if (setPomodoro()) {
        pomodoro();
    }
}

function pausePomodoro() {
    clearInterval(timerInterval);
    document.getElementById("messages").innerHTML = "Pomodoro Paused.";
    timeLeft = endTime - Date.now();
    // document.getElementById("timerButton1").innerHTML = "Resume";
    // document.getElementById("timerButton1").setAttribute( "onClick",
    //     "javascript: timer();" );
    document.getElementById("timerButton2").setAttribute( "onClick",
        "javascript: resetPomodoro();" );
}

function resetPomodoro() {
    clearInterval(timerInterval);
    document.getElementById("messages").innerHTML = "Pomodoro cancelled.";
    setPomodoro();
    document.getElementById("timerButton1").innerHTML = "Start";
    document.getElementById("timerButton1").setAttribute( "onClick",
        "javascript: startPomodoro();" );
    document.getElementById("timerButton2").setAttribute( "onClick", "" );
}