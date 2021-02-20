let display = document.getElementById("display");

function number(num) {
  if ($("#display").text() == "0") {
    $("#display").text(num);
    return;
  }
  $("#display").append(num);
}

function operatorButton(op) {
  let testStr = $("#display").text();
  let lastChar = testStr[testStr.length - 1];
  let secondLast = testStr[testStr.length - 2];
  if (op == "-") {
    if (lastChar !== "-") {
      $("#display").append(op);
      return;
    }
  }
  if (
    lastChar == "+" ||
    lastChar == "-" ||
    lastChar == "/" ||
    lastChar == "*"
  ) {
    if (
      secondLast == "+" ||
      secondLast == "-" ||
      secondLast == "/" ||
      secondLast == "*"
    ) {
      let tripleOp = testStr.slice(0, -2) + op;
      $("#display").text(tripleOp);
      return;
    }
    let doubleOp = testStr.slice(0, -1) + op;
    $("#display").text(doubleOp);
    return;
  }
  $("#display").append(op);
}

function addDecimal() {
  let testStr = $("#display").text();
  for (let i = testStr.length - 1; i > 0; i--) {
    if (
      testStr[i] == "+" ||
      testStr[i] == "-" ||
      testStr[i] == "/" ||
      testStr[i] == "*"
    ) {
      $("#display").append(".");
      return;
    }
    if (testStr[i] == ".") {
      return;
    }
  }
  $("#display").append(".");
}

function clearButton() {
  $("#display").text(0);
}

function calculate() {
  let input = $("#display").text();
  let solution = math.evaluate(input);
  $("#display").text(solution);
}

document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 96:
      number(0);
      break;
    case 97:
      number(1);
      break;
    case 98:
      number(2);
      break;
    case 99:
      number(3);
      break;
    case 100:
      number(4);
      break;
    case 101:
      number(5);
      break;
    case 102:
      number(6);
      break;
    case 103:
      number(7);
      break;
    case 104:
      number(8);
      break;
    case 105:
      number(9);
      break;
    case 107:
      operatorButton("+");
      break;
    case 109:
      operatorButton("-");
      break;
    case 106:
      operatorButton("*");
      break;
    case 111:
      operatorButton("/");
      break;
    case 110:
      addDecimal();
      break;
    case 13:
      calculate();
      break;
    case 8:
      clearButton();
      break;
  }
});
