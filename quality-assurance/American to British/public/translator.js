import { americanOnly } from "./american-only.js";
import { britishOnly } from "./british-only.js";
import { americanToBritishSpelling } from "./american-to-british-spelling.js";
import { americanToBritishTitles } from "./american-to-british-titles.js";

const textArea = document.getElementById("text-input");
const errorArea = document.getElementById("error-msg");
const translateArea = document.getElementById("translated-sentence");

const timeRegexA = /\d{1,2}:\d{1,2}/;
const timeRegexB = /\d{1,2}.\d{1,2}/;

function clear() {
  textArea.value = "";
  translateArea.innerText = "";
  errorArea.innerText = "";
}

function translatorEngage() {
  errorArea.innerText = "";
  const selector = document.getElementById("locale-select").value;
  if (textArea.value === "") {
    errorArea.innerText = "Error: No text to translate.";
    return;
  }
  if (selector == "american-to-british") {
    return AToB();
  }
  if (selector == "british-to-american") {
    return BToA();
  }
}

function AToB() {
  const beginning = textArea.value;
  const array = beginning.split(" ");
  for (let i = 0; i < array.length; i++) {
    let istitle = false;
    let substring = false;
    let save = "";
    if (americanToBritishTitles.hasOwnProperty(array[i])) {
      console.log("istitle");
      array[i] = americanToBritishTitles[array[i]];
      istitle = true;
    }
    const end = array[i].length - 1;
    if (
      (array[i][end] === "." ||
        array[i][end] === "!" ||
        array[i][end] === "?" ||
        array[i][end] === ",") &&
      !istitle
    ) {
      save = array[i].substring(end, end + 1);
      array[i] = array[i].substring(0, end);
      substring = true;
      console.log("has end punctuation");
    }
    if (americanOnly.hasOwnProperty(array[i].toLowerCase())) {
      array[i] = americanOnly[array[i].toLowerCase()];
    }
    if (americanToBritishSpelling.hasOwnProperty(array[i].toLowerCase())) {
      array[i] = americanToBritishSpelling[array[i].toLowerCase()];
    }
    if (i > 1) {
      if (
        americanOnly.hasOwnProperty(
          `${array[i - 1].toLowerCase()} ${array[i].toLowerCase()}`
        )
      ) {
        array.splice(
          i - 1,
          2,
          americanOnly[
            `${array[i - 1].toLowerCase()} ${array[i].toLowerCase()}`
          ]
        );
        i--;
      }
    }
    if (i > 2) {
      if (
        americanOnly.hasOwnProperty(
          `${array[i - 2].toLowerCase()} ${array[i - 1].toLowerCase()} ${array[
            i
          ].toLowerCase()}`
        )
      ) {
        array.splice(
          i - 2,
          3,
          americanOnly[
            `${array[i - 2].toLowerCase()} ${array[
              i - 1
            ].toLowerCase()} ${array[i].toLowerCase()}`
          ]
        );
        i--;
        i--;
      }
    }
    if (timeRegexA.test(array[i])) {
      array[i] = array[i].replace(":", ".");
    }
    if (substring) {
      array[i] = array[i] + save;
    }
  }
  const solutionArray = array;
  console.log(solutionArray);
  const solution = solutionArray.join(" ");
  translateArea.innerText = solution;
  return validate();
}

function BToA() {
  const beginning = textArea.value;
  const array = beginning.split(" ");
  let save = "";
  for (let i = array.length - 1; i >= 0; i--) {
    let substring = false;
    const end = array[i].length - 1;
    if (
      array[i][end] === "." ||
      array[i][end] === "!" ||
      array[i][end] === "?" ||
      array[i][end] === ","
    ) {
      save = array[i].substring(array[i].length - 1);
      array[i] = array[i].substring(0, end);
      substring = true;
    }
    if (britishOnly.hasOwnProperty(array[i].toLowerCase())) {
      array[i] = britishOnly[array[i].toLowerCase()];
    }
    if (
      Object.values(americanToBritishSpelling).indexOf(
        array[i].toLowerCase()
      ) >= 0
    ) {
      array[i] = Object.keys(americanToBritishSpelling)[
        Object.values(americanToBritishSpelling).indexOf(array[i].toLowerCase())
      ];
    }
    if (
      Object.values(americanToBritishTitles).indexOf(array[i]) >=
      0
    ) {
      array[i] = Object.keys(americanToBritishTitles)[
        Object.values(americanToBritishTitles).indexOf(array[i])
      ];
    }
    if (i > 2) {
      if (
        britishOnly.hasOwnProperty(
          `${array[i - 2].toLowerCase()} ${array[i - 1].toLowerCase()} ${array[
            i
          ].toLowerCase()}`
        )
      ) {
        array.splice(
          i - 2,
          3,
          britishOnly[
            `${array[i - 2].toLowerCase()} ${array[
              i - 1
            ].toLowerCase()} ${array[i].toLowerCase()}`
          ]
        );
      }
    }
    if (i > 1) {
      if (
        britishOnly.hasOwnProperty(
          `${array[i - 1].toLowerCase()} ${array[i].toLowerCase()}`
        )
      ) {
        array.splice(
          i - 1,
          2,
          britishOnly[`${array[i - 1].toLowerCase()} ${array[i].toLowerCase()}`]
        );
      }
    }
    if (timeRegexB.test(array[i])) {
      array[i] = array[i].replace(".", ":");
    }
    if (substring) {
      array[i] = array[i] + save;
    }
  }
  const solutionArray = array;
  console.log(solutionArray);
  const solution = solutionArray.join(" ").replace(" undefined", "");
  translateArea.innerText = solution;
  return validate();
}

function validate() {
  if (textArea.value == translateArea.innerText) {
    translateArea.innerText = "Everything looks good to me!";
  }
}
/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
document.getElementById("translate-btn").onclick = translatorEngage;
document.getElementById("clear-btn").onclick = clear;
try {
  module.exports = {
    AToB,
    BToA,
    clear,
    translatorEngage,
  };
} catch (e) {}
