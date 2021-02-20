/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require("chai");
const assert = chai.assert;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let Solver;

suite("UnitTests", () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Solver
    return JSDOM.fromFile("./views/index.html").then((dom) => {
      global.window = dom.window;
      global.document = dom.window.document;

      Solver = require("../public/sudoku-solver.js");
    });
  });

  // Only the digits 1-9 are accepted
  // as valid input for the puzzle grid
  suite("Function ____()", () => {
    test('Valid "1-9" characters', (done) => {
      const input = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      input.forEach((el) => assert.equal(Solver.invalidinput(el), false));
      done();
    });

    // Invalid characters or numbers are not accepted
    // as valid input for the puzzle grid
    test('Invalid characters (anything other than "1-9") are not accepted', (done) => {
      const input = ["!", "a", "/", "+", "-", "0", "10", 0, "."];
      input.forEach((el) => assert.equal(Solver.invalidinput(el), true));
      done();
    });
  });

  suite("Function ____()", () => {
    test("Parses a valid puzzle string into an object", (done) => {
      const input =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      assert.equal(Solver.createboard(input), [
        ["7", ".", "9", ".", ".", "5", ".", "1", "."],
        ["8", "5", ".", "4", ".", ".", ".", ".", "2"],
        ["4", "3", "2", ".", ".", ".", ".", ".", "."],
        ["1", ".", ".", ".", "6", "9", ".", "8", "3"],
        [".", "9", ".", ".", ".", ".", ".", "6", "."],
        ["6", "2", ".", "7", "1", ".", ".", ".", "9"],
        [".", ".", ".", ".", ".", ".", "1", "9", "4"],
        ["5", ".", ".", ".", ".", "4", ".", "3", "7"],
        [".", "4", ".", "3", ".", ".", "6", ".", "."],
      ]);
      done();
    });

    // Puzzles that are not 81 numbers/periods long show the message
    // "Error: Expected puzzle to be 81 characters long." in the
    // `div` with the id "error-msg"
    test("Shows an error for puzzles that are not 81 numbers long", (done) => {
      const shortStr = "83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const longStr =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...";
      const errorMsg =
        "Error: Expected puzzle to be 81 characters long and contain the characters 1-9 or .";
      const errorDiv = document.getElementById("error-msg");
      assert.equal(Solver.invalidlength(shortStr), true);
      assert.equal(Solver.invalidlength(longStr), true);
      Solver.fillpuzzle(shortStr).then(
        assert.equal(errorDiv.innerText, errorMsg)
      );
      done();
    });
  });

  suite("Function ____()", () => {
    // Valid complete puzzles pass
    test("Valid puzzles pass", (done) => {
      const input =
        "769235418851496372432178956174569283395842761628713549283657194516924837947381625";
      assert.equal(Solver.solvepuzzle(input), true);
      done();
    });

    // Invalid complete puzzles fail
    test("Invalid puzzles fail", (done) => {
      const input =
        "779235418851496372432178956174569283395842761628713549283657194516924837947381625";
      assert.equal(Solver.solvepuzzle(input), false);
      done();
    });
  });

  suite("Function ____()", () => {
    // Returns the expected solution for a valid, incomplete puzzle
    test("Returns the expected solution for an incomplete puzzle", (done) => {
      const input =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      Solver.solvepuzzle(input).then(
        assert.equal(
          document.getElementById("text-input").value,
          "769235418851496372432178956174569283395842761628713549283657194516924837947381625"
        )
      );
      done();
    });
  });
});
