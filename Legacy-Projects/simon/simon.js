const colors = ["red", "blue", "green", "yellow"];
let sequence = [];
let count = 0;
let player = 0;
let strict = false;

const start = (isStrict = false) => {
  if (isStrict) strict = true;
  if (!isStrict) strict = false;
  console.log("started");
  count = 0;
  player = 0;
  sequence = [];
  const random = Math.floor(Math.random() * 4);
  const firstColor = colors[random];
  sequence.push(firstColor);
  count++;
  document.getElementById("length").innerText = sequence.length;
  lightUp(firstColor);
  if (count < player + 1) {
    setTimeout(nextInLine, 1000);
  }
};

const nextInLine = () => {
  const random = Math.floor(Math.random() * 4);
  const targetColor = colors[random];
  sequence.push(targetColor);
  count++;
  document.getElementById("length").innerText = sequence.length;
  lightUp(targetColor);
  if (count < player + 1) {
    setTimeout(nextInLine, 1000);
  } else {
    player = 0;
  }
};

const press = (color) => {
  playSound(sounds[color].url);
  if (count === 0) {
    return alert("Please press start!");
  }
  if (count < player + 1) {
    return;
  }
  if (color != sequence[player]) {
    if (strict) {
      return alert("You lose! Press Start to try again.");
    }
    alert("Incorrect sequence, restarting");
    player = 0;
    lightUpAll("reset");
  }
  if (color == sequence[player]) {
    player++;
  }
  if (player == sequence.length) {
    setTimeout(lightUpAll, 1000);
  }
};

const lightUp = (color) => {
  const target = document.getElementById(color);
  playSound(sounds[color].url);
  target.classList.add("lit");
  setTimeout(() => {
    target.classList.remove("lit");
  }, 500);
};

const lightUpAll = (reset) => {
  if (sequence.length === 20) {
    return alert("You win!");
  }
  for (let i = 0; i < sequence.length; i++) {
    setTimeout(() => {
      lightUp(sequence[i]);
    }, 1000 * i);
  }
  if (!reset) {
    setTimeout(nextInLine, 1000 * sequence.length);
  }
};

const playSound = (url) => {
  const sound = new Audio(url);
  sound.play();
};

const sounds = {
  red: {
    url: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
  },
  blue: {
    url: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
  },
  green: {
    url: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
  },
  yellow: {
    url: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
  },
};
