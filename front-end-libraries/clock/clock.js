function breakDown() {
  let value = $("#break-length").text();
  value = Number(value);
  if (value == "1") {
    return;
  } else {
    let newValue = value - 1;
    $("#break-length").text(newValue);
    return;
  }
}

function sessionUp() {
  let value = $("#session-length").text();
  value = Number(value);
  if (value == "60") {
    return;
  } else {
    let newValue = value + 1;
    $("#session-length").text(newValue);
    sessTimeCalc();
    return;
  }
}
function sessionDown() {
  let value = $("#session-length").text();
  value = Number(value);
  if (value == "1") {
    return;
  } else {
    let newValue = value - 1;
    $("#session-length").text(newValue);
    sessTimeCalc();
    return;
  }
}

function breakUp() {
  let value = $("#break-length").text();
  value = Number(value);
  if (value == "60") {
    return;
  } else {
    let newValue = value + 1;
    $("#break-length").text(newValue);
    return;
  }
}
//make up and down buttons work!

function resetButton() {
  $("#break-length").text("5");
  $("#session-length").text("25");
  sessTimeCalc();
  Stop();
  alarm.pause();
  alarm.currentTime = 0;
}
//reset button

function sessTimeCalc() {
  let timeValue = $("#session-length").text();
  console.log(timeValue);
  if (timeValue == "60") {
    $("#time-left").text("60:00");
    $("#timer-label").text("Work");
    return;
  }
  timeValue = Number(timeValue) * 1000 * 60;
  let timeObj = new Date(timeValue);
  let minutes = timeObj.getUTCMinutes();
  let seconds = timeObj.getUTCSeconds();
  let timeString =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
  $("#time-left").text(timeString);
  $("#timer-label").text("Work");
}

function breakTimeCalc() {
  let timeValue = $("#break-length").text();
  if (timeValue == "60") {
    $("#time-left").text("60:00");
    $("#timer-label").text("break");
    return;
  }
  timeValue = Number(timeValue) * 1000 * 60 + 1000;
  let timeObj = new Date(timeValue);
  let minutes = timeObj.getUTCMinutes();
  let seconds = timeObj.getUTCSeconds();
  let timeString =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
  $("#time-left").text(timeString);
  $("#timer-label").text("Break");
}

var ssButton = document.getElementById("start_stop");
ssButton.addEventListener("click", Start);
let timergo;
var alarm = document.getElementById("beep");

function runningTimer() {
  if ($("#timer-label").text() == "Work") {
    runningSessionTimer();
  }
  if ($("#timer-label").text() == "Break") {
    runningBreakTimer();
  }
}

function runningSessionTimer() {
  let t = $("#time-left").text();
  let tt = Number(t.split(":")[0]) * 1000 * 60 + Number(t.split(":")[1]) * 1000;
  tt = tt - 1000;
  let timeValue = tt;
  timeValue = Number(timeValue);
  let timeObj = new Date(timeValue);
  let minutes = timeObj.getUTCMinutes();
  let seconds = timeObj.getUTCSeconds();
  let timeString =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
  $("#time-left").text(timeString);
  if (tt == 0) {
    alarm.play();
  }
  if (tt == -1000) {
    breakTimeCalc();
  }
}

function runningBreakTimer() {
  let t = $("#time-left").text();
  let tt = Number(t.split(":")[0]) * 1000 * 60 + Number(t.split(":")[1]) * 1000;
  tt = tt - 1000;
  console.log(tt);
  let timeValue = tt;
  timeValue = Number(timeValue);
  let timeObj = new Date(timeValue);
  let minutes = timeObj.getUTCMinutes();
  let seconds = timeObj.getUTCSeconds();
  let timeString =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
  $("#time-left").text(timeString);
  if (tt == 0) {
    alarm.play();
  }
  if (tt == -1000) {
    sessTimeCalc();
  }
}
function Start() {
  $("#start_stop").html('<i class="fas fa-square"></i>');
  timergo = setInterval(runningTimer, 1000);
  ssButton.removeEventListener("click", Start);
  ssButton.addEventListener("click", Stop);
  ssButton.value = "Stop";
}

function Stop() {
  $("#start_stop").html('<i class="fas fa-play"></i>');
  clearInterval(timergo);
  ssButton.removeEventListener("click", Stop);
  ssButton.addEventListener("click", Start);
  ssButton.value = "Start";
}
