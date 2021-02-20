const textArea = document.getElementById("text-input");
const errorMsg =
  "Error: Expected puzzle to be 81 characters long and contain the characters 1-9 or .";
const errorDiv = document.getElementById("error-msg");
const testRegex = /[^1-9.]/g;
const grid = [
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "A6",
  "A7",
  "A8",
  "A9",
  "B1",
  "B2",
  "B3",
  "B4",
  "B5",
  "B6",
  "B7",
  "B8",
  "B9",
  "C1",
  "C2",
  "C3",
  "C4",
  "C5",
  "C6",
  "C7",
  "C8",
  "C9",
  "D1",
  "D2",
  "D3",
  "D4",
  "D5",
  "D6",
  "D7",
  "D8",
  "D9",
  "E1",
  "E2",
  "E3",
  "E4",
  "E5",
  "E6",
  "E7",
  "E8",
  "E9",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "G1",
  "G2",
  "G3",
  "G4",
  "G5",
  "G6",
  "G7",
  "G8",
  "G9",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "H7",
  "H8",
  "H9",
  "I1",
  "I2",
  "I3",
  "I4",
  "I5",
  "I6",
  "I7",
  "I8",
  "I9",
];
// import { puzzlesAndSolutions } from './puzzle-strings.js';

document.addEventListener("DOMContentLoaded", () => {
  // Load a simple puzzle into the text area
  textArea.value =
    "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
  fillpuzzle();
});

function createboard(data) {
  const board = [
    data.substring(0, 9).split(""),
    data.substring(9, 18).split(""),
    data.substring(18, 27).split(""),
    data.substring(27, 36).split(""),
    data.substring(36, 45).split(""),
    data.substring(45, 54).split(""),
    data.substring(54, 63).split(""),
    data.substring(63, 72).split(""),
    data.substring(72, 81).split(""),
  ];
  return board;
}

function invalidlength(str) {
  if (str.length !== 81) {
    return true;
  }
  return false;
}

function invalidinput(str) {
  if (testRegex.test(str)) {
    return true;
  }
  return false;
}

//referenced stack overflow for this codeblock too
function validNum(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (board[row][i] == num || board[i][col] == num || board[m][n] == num) {
      return false;
    }
  }
  return true;
}

function solvepuzzle() {
  const data = textArea.value;
  if (invalidlength(data) || invalidinput(data)) {
    alert(errorMsg);
    return;
  }
  const board = createboard(data);
  //had to reference stack overflow for this logic :(
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] == ".") {
        for (let k = 1; k <= 9; k++) {
          if (validNum(board, r, c, k)) {
            board[r][c] = `${k}`;
            textArea.value = board.flat().join("");
            if (solvepuzzle()) {
              return true;
            } else {
              board[r][c] = ".";
            }
          }
        }
        return false;
      }
    }
  }

  fillpuzzle();
  return true;
}

function fillpuzzle() {
  errorDiv.innerText = "";
  const data = textArea.value;
  if (invalidlength(data) || invalidinput(data)) {
    errorDiv.innerText = errorMsg;
    return;
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i] === ".") {
      continue;
    }
    document.getElementById(grid[i]).value = data[i];
  }
  return;
}

function getpuzzle() {
  const strArray = [];
  for (let i = 0; i < grid.length; i++) {
    if (document.getElementById(grid[i]).value === "") {
      strArray.push(".");
    } else {
      strArray.push(document.getElementById(grid[i]).value);
    }
  }
  const str = strArray.join("");
  document.getElementById("text-input").value = str;
}

function clear() {
  textArea.value = "";
  return;
}

document.getElementById("solve-button").onclick = solvepuzzle;
textArea.oninput = fillpuzzle;
document.getElementById("clear-button").onclick = clear;
for (let i = 0; i < grid.length; i++) {
  document.getElementById(grid[i]).oninput = getpuzzle;
}
/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    invalidlength,
    invalidinput,
    fillpuzzle,
    solvepuzzle,
    validNum,
    createboard,
    clear,
    getpuzzle,
  };
} catch (e) {}
