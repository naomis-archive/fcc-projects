/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  var convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    var input = req.query.input;
    var initNum = convertHandler.getNum(input);
    var initUnit = convertHandler.getUnit(input);
    var returnNum = convertHandler.convert(initNum, initUnit);
    var returnUnit = convertHandler.getReturnUnit(initUnit);
    var toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    if (initNum == undefined && initUnit == undefined) {
      let errorMsg = {
        Error: "invalid number and unit",
        string:
          "You need to enter a valid number (i.e. 3) and a valid unit of measure ('mi', 'km', 'L', 'gal', 'kg', 'lbs')",
      };
      res.json(errorMsg);
    }
    if (initNum == undefined) {
      let errorMsg = {
        Error: "invalid number",
        string: "You need to enter a valid number (i.e. 3)",
      };
      res.json(errorMsg);
    }
    if (initUnit == undefined) {
      let errorMsg = {
        Error: "invalid unit",
        string:
          "You need to enter a valid unit of measure ('mi', 'km', 'L', 'gal', 'kg', 'lbs')",
      };
      res.json(errorMsg);
    } else {
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString,
      });
    }
  });
};
