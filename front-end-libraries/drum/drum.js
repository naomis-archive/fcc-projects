function displayUpdate(key) {
  if (key == "Q") {
    let display = "Heater 1";
    document.getElementById("play").innerHTML = display;
  }
  if (key == "W") {
    let display = "Heater 2";
    document.getElementById("play").innerHTML = display;
  }
  if (key == "E") {
    let display = "Heater 3";
    document.getElementById("play").innerHTML = display;
  }
  if (key == "A") {
    let display = "Heater 4";
    document.getElementById("play").innerHTML = display;
  }
  if (key == "S") {
    let display = "Clap";
    document.getElementById("play").innerHTML = display;
  }
  if (key == "D") {
    let display = "Open HH";
    document.getElementById("play").innerHTML = display;
  }
  if (key == "Z") {
    let display = "Kick n Hat";
    document.getElementById("play").innerHTML = display;
  }
  if (key == "X") {
    let display = "Kick";
    document.getElementById("play").innerHTML = display;
  }
  if (key == "C") {
    let display = "Closed HH";
    document.getElementById("play").innerHTML = display;
  }
}

function playSound(key) {
  let audio = document.getElementById(key);
  audio.play();
  displayUpdate(key);
}

document.addEventListener("keydown", function (event) {
  let key = event.key;
  key = key.toUpperCase();
  playSound(key);
});
