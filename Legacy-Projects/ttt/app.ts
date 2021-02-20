const box1: HTMLElement | any = document.getElementById("1");
const box2: HTMLElement | any = document.getElementById("2");
const box3: HTMLElement | any = document.getElementById("3");
const box4: HTMLElement | any = document.getElementById("4");
const box5: HTMLElement | any = document.getElementById("5");
const box6: HTMLElement | any = document.getElementById("6");
const box7: HTMLElement | any = document.getElementById("7");
const box8: HTMLElement | any = document.getElementById("8");
const box9: HTMLElement | any = document.getElementById("9");

const x: string = '<img src="./x.png">';
const o: string = '<img src="./o.png">';

let player: string = x;
let computer: string = o;

function playervar(char: string) {
  if (char == "x") {
    player = x;
    computer = o;
    return;
  }
  if (char == "o") {
    player = o;
    computer = x;
    return;
  }
}

function reset() {
  box1.innerHTML = "";
  box2.innerHTML = "";
  box3.innerHTML = "";
  box4.innerHTML = "";
  box5.innerHTML = "";
  box6.innerHTML = "";
  box7.innerHTML = "";
  box8.innerHTML = "";
  box9.innerHTML = "";
}

function gamestart(): any {
  reset();
  const check: number = Math.floor(Math.random() * 2);
  if (check == 1) {
    alert("Computer goes first!");
    return computerfillbox("0");
  } else {
    return alert("You go first!");
  }
}

function checkwinner(): boolean {
  if (
    box1.innerHTML == box2.innerHTML &&
    box2.innerHTML == box3.innerHTML &&
    box1.innerHTML != ""
  ) {
    return true;
  } else if (
    box4.innerHTML == box5.innerHTML &&
    box5.innerHTML == box6.innerHTML &&
    box4.innerHTML != ""
  ) {
    return true;
  } else if (
    box7.innerHTML == box8.innerHTML &&
    box8.innerHTML == box9.innerHTML &&
    box7.innerHTML != ""
  ) {
    return true;
  } else if (
    box1.innerHTML == box4.innerHTML &&
    box4.innerHTML == box7.innerHTML &&
    box1.innerHTML != ""
  ) {
    return true;
  } else if (
    box2.innerHTML == box5.innerHTML &&
    box5.innerHTML == box8.innerHTML &&
    box2.innerHTML != ""
  ) {
    return true;
  } else if (
    box3.innerHTML == box6.innerHTML &&
    box6.innerHTML == box9.innerHTML &&
    box3.innerHTML != ""
  ) {
    return true;
  } else if (
    box1.innerHTML == box5.innerHTML &&
    box5.innerHTML == box9.innerHTML &&
    box1.innerHTML != ""
  ) {
    return true;
  } else if (
    box3.innerHTML == box5.innerHTML &&
    box5.innerHTML == box7.innerHTML &&
    box3.innerHTML != ""
  ) {
    return true;
  } else {
    return false;
  }
}

function checktie(): boolean {
  if (
    box1.innerHTML != "" &&
    box2.innerHTML != "" &&
    box3.innerHTML != "" &&
    box4.innerHTML != "" &&
    box5.innerHTML != "" &&
    box6.innerHTML != "" &&
    box7.innerHTML != "" &&
    box8.innerHTML != "" &&
    box9.innerHTML != ""
  ) {
    return true;
  } else {
    return false;
  }
}

function playerturn(box: string) {
  const clicked: HTMLElement | any = document.getElementById(box);
  if (clicked.innerHTML != "") {
    return alert("You can't fill that square. Choose an empty one.");
  }
  clicked.innerHTML = player;
  if (checkwinner() == true) {
    alert("You win!");
    reset();
  } else if (checktie() == true) {
    alert("It's a tie.");
    reset();
  } else {
    computerturn(box);
  }
}
function computerfillbox(val: string): any {
  const num: number = Math.floor(Math.random() * 8) + 1;
  const randomplace: string = num.toString();
  const randombox: HTMLElement | any = document.getElementById(randomplace);
  if (val !== "0") {
    const place: HTMLElement | any = document.getElementById(val);
    console.log("Computer logically plays at " + val);
    place.innerHTML = computer;
    if (checkwinner() == true) {
      alert("You lose...");
      reset();
    }
    if (checktie() == true) {
      alert("It's a tie.");
      reset();
    }
  } else {
    if (randombox.innerHTML !== "") {
      return computerfillbox("0");
    }
    randombox.innerHTML = computer;
    console.log("Computer randomly plays at " + randomplace);
    if (checkwinner() == true) {
      alert("You lose...");
    }
    if (checktie() == true) {
      alert("It's a tie.");
    }
  }
}
function computerturn(box: string) {
  if (box == "1") {
    if (box2.innerHTML == player) {
      if (box3.innerHTML == "") {
        return computerfillbox("3");
      }
    }
    if (box4.innerHTML == player) {
      if (box7.innerHTML == "") {
        return computerfillbox("7");
      }
    }
    if (box5.innerHTML == player) {
      if (box9.innerHTML == "") {
        return computerfillbox("9");
      }
    }
    if (box3.innerHTML == player) {
      if (box2.innerHTML == "") {
        return computerfillbox("2");
      }
    }
    if (box7.innerHTML == player) {
      if (box4.innerHTML == "") {
        return computerfillbox("4");
      }
    }
    if (box9.innerHTML == player) {
      if (box5.innerHTML == "") {
        return computerfillbox("5");
      }
    } else {
      return computerfillbox("0");
    }
  }
  if (box == "2") {
    if (box1.innerHTML == player) {
      if (box3.innerHTML == "") {
        return computerfillbox("3");
      }
    }
    if (box3.innerHTML == player) {
      if (box2.innerHTML == "") {
        return computerfillbox("2");
      }
    }
    if (box5.innerHTML == player) {
      if (box8.innerHTML == "") {
        return computerfillbox("8");
      }
    }
    if (box8.innerHTML == player) {
      if (box5.innerHTML == "") {
        return computerfillbox("5");
      }
    } else {
      return computerfillbox("0");
    }
  }
  if (box == "3") {
    if (box2.innerHTML == player) {
      if (box1.innerHTML == "") {
        return computerfillbox("1");
      }
    }
    if (box6.innerHTML == player) {
      if (box9.innerHTML == "") {
        return computerfillbox("9");
      }
    }
    if (box5.innerHTML == player) {
      if (box7.innerHTML == "") {
        return computerfillbox("7");
      }
    }
    if (box1.innerHTML == player) {
      if (box2.innerHTML == "") {
        return computerfillbox("2");
      }
    }
    if (box9.innerHTML == player) {
      if (box6.innerHTML == "") {
        return computerfillbox("6");
      }
    }
    if (box7.innerHTML == player) {
      if (box5.innerHTML == "") {
        return computerfillbox("5");
      }
    } else {
      return computerfillbox("0");
    }
  }
  if (box == "4") {
    if (box1.innerHTML == player) {
      if (box7.innerHTML == "") {
        return computerfillbox("7");
      }
    }
    if (box5.innerHTML == player) {
      if (box6.innerHTML == "") {
        return computerfillbox("6");
      }
    }
    if (box7.innerHTML == player) {
      if (box1.innerHTML == "") {
        return computerfillbox("1");
      }
    }
    if (box6.innerHTML == player) {
      if (box5.innerHTML == "") {
        return computerfillbox("5");
      }
    } else {
      return computerfillbox("0");
    }
  }
  if (box == "5") {
    if (box1.innerHTML == player) {
      if (box9.innerHTML == "") {
        return computerfillbox("9");
      }
    }
    if (box2.innerHTML == player) {
      if (box8.innerHTML == "") {
        return computerfillbox("8");
      }
    }
    if (box3.innerHTML == player) {
      if (box7.innerHTML == "") {
        return computerfillbox("7");
      }
    }
    if (box4.innerHTML == player) {
      if (box6.innerHTML == "") {
        return computerfillbox("6");
      }
    }
    if (box6.innerHTML == player) {
      if (box4.innerHTML == "") {
        return computerfillbox("4");
      }
    }
    if (box7.innerHTML == player) {
      if (box3.innerHTML == "") {
        return computerfillbox("3");
      }
    }
    if (box8.innerHTML == player) {
      if (box2.innerHTML == "") {
        return computerfillbox("2");
      }
    }
    if (box9.innerHTML == player) {
      if (box1.innerHTML == "") {
        return computerfillbox("1");
      }
    } else {
      return computerfillbox("0");
    }
  }
  if (box == "6") {
    if (box3.innerHTML == player) {
      if (box9.innerHTML == "") {
        return computerfillbox("9");
      }
    }
    if (box5.innerHTML == player) {
      if (box4.innerHTML == "") {
        return computerfillbox("4");
      }
    }
    if (box9.innerHTML == player) {
      if (box3.innerHTML == "") {
        return computerfillbox("3");
      }
    }
    if (box4.innerHTML == player) {
      if (box5.innerHTML == "") {
        return computerfillbox("5");
      }
    } else {
      return computerfillbox("0");
    }
  }
  if (box == "7") {
    if (box4.innerHTML == player) {
      if (box1.innerHTML == "") {
        return computerfillbox("1");
      }
    }
    if (box5.innerHTML == player) {
      if (box3.innerHTML == "") {
        return computerfillbox("3");
      }
    }
    if (box8.innerHTML == player) {
      if (box9.innerHTML == "") {
        return computerfillbox("9");
      }
    }
    if (box1.innerHTML == player) {
      if (box4.innerHTML == "") {
        return computerfillbox("4");
      }
    }
    if (box3.innerHTML == player) {
      if (box5.innerHTML == "") {
        return computerfillbox("5");
      }
    }
    if (box9.innerHTML == player) {
      if (box8.innerHTML == "") {
        return computerfillbox("8");
      }
    } else {
      return computerfillbox("0");
    }
  }
  if (box == "8") {
    if (box7.innerHTML == player) {
      if (box9.innerHTML == "") {
        return computerfillbox("9");
      }
    }
    if (box5.innerHTML == player) {
      if (box2.innerHTML == "") {
        return computerfillbox("2");
      }
    }
    if (box9.innerHTML == player) {
      if (box7.innerHTML == "") {
        return computerfillbox("7");
      }
    }
    if (box2.innerHTML == player) {
      if (box5.innerHTML == "") {
        return computerfillbox("5");
      }
    } else {
      return computerfillbox("0");
    }
  }
  if (box == "9") {
    if (box6.innerHTML == player) {
      if (box3.innerHTML == "") {
        return computerfillbox("3");
      }
    }
    if (box5.innerHTML == player) {
      if (box1.innerHTML == "") {
        return computerfillbox("1");
      }
    }
    if (box8.innerHTML == player) {
      if (box7.innerHTML == "") {
        return computerfillbox("7");
      }
    }
    if (box7.innerHTML == player) {
      if (box8.innerHTML == "") {
        return computerfillbox("8");
      }
    }
    if (box1.innerHTML == player) {
      if (box5.innerHTML == "") {
        return computerfillbox("5");
      }
    }
    if (box3.innerHTML == player) {
      if (box6.innerHTML == "") {
        return computerfillbox("6");
      }
    } else {
      return computerfillbox("0");
    }
  }
}
