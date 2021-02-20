/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

function ConvertHandler() {
  this.getNum = function (input) {
    let inputArr = input.split("");
    let outputArr = [];
    let test = /\d/;
    let firsttest = /[a-zA-Z]/;
    let dCount = 0;
    let sCount = 0;
    if (firsttest.test(inputArr[0]) == true) {
      return 1;
    }
    for (let i = 0; i < inputArr.length; i++) {
      if (
        test.test(inputArr[i]) == true ||
        inputArr[i] == "/" ||
        inputArr[i] == "."
      ) {
        if (inputArr[i] == ".") {
          dCount++;
        }
        if (inputArr[i] == "/") {
          (dCount = 0), sCount++;
        }
        outputArr.push(inputArr[i]);
      } else {
        break;
      }
    }
    if (dCount > 1 || sCount > 1) {
      return undefined;
    }
    let result = outputArr.join("");
    result = eval(result);
    return result;
  };

  this.getUnit = function (input) {
    input = input.toLowerCase();
    if (input == "l") {
      return "l";
    }
    let inputArr = input.split("");
    let outputArr = [];
    let test = /[a-z]/;
    for (let i = 0; i < inputArr.length; i++) {
      if (test.test(inputArr[i]) == true) {
        outputArr.push(inputArr[i]);
      }
    }
    let unit = outputArr.join("");
    if (unit == "gal") {
      return unit;
    }
    if (unit == "l") {
      return unit;
    }
    if (unit == "lbs") {
      return unit;
    }
    if (unit == "kg") {
      return unit;
    }
    if (unit == "mi") {
      return unit;
    }
    if (unit == "km") {
      return unit;
    } else {
      return undefined;
    }
  };

  this.getReturnUnit = function (initUnit) {
    if (initUnit == "gal") {
      return "l";
    }
    if (initUnit == "l") {
      return "gal";
    }
    if (initUnit == "lbs") {
      return "kg";
    }
    if (initUnit == "kg") {
      return "lbs";
    }
    if (initUnit == "mi") {
      return "km";
    }
    if (initUnit == "km") {
      return "mi";
    } else {
      return "Invalid Unit";
    }
  };

  this.spellOutUnit = function (unit) {
    if (unit == "gal") {
      return "gallons";
    }
    if (unit == "l") {
      return "litres";
    }
    if (unit == "lbs") {
      return "pounds";
    }
    if (unit == "kg") {
      return "kilograms";
    }
    if (unit == "mi") {
      return "miles";
    }
    if (unit == "km") {
      return "kilometres";
    } else {
      return "Invalid Unit";
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    if (initUnit == "gal") {
      let result = initNum * galToL;
      return result;
    }
    if (initUnit == "l") {
      let result = initNum / galToL;
      return result;
    }
    if (initUnit == "lbs") {
      let result = initNum * lbsToKg;
      return result;
    }
    if (initUnit == "kg") {
      let result = initNum / lbsToKg;
      return result;
    }
    if (initUnit == "mi") {
      let result = initNum * miToKm;
      return result;
    }
    if (initUnit == "km") {
      let result = initNum / miToKm;
      return result;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    if (returnNum !== undefined) {
      returnNum = returnNum.toFixed(5);
    }
    let string =
      initNum +
      " " +
      this.spellOutUnit(initUnit) +
      " converts to " +
      returnNum +
      " " +
      this.spellOutUnit(returnUnit);
    return string;
  };
}

module.exports = ConvertHandler;
