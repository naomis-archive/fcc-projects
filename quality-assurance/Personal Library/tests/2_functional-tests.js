/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Routing tests", function () {
    suite(
      "POST /api/books with title => create book object/expect book object",
      function () {
        test("Test POST /api/books with title", function (done) {
          chai
            .request(server)
            .post("/api/books")
            .send({
              title: "Functional Test - Test POST with Title",
              bookID: 12345,
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.property(res.body, "title");
              assert.property(res.body, "_id");
              done();
            });
        });

        test("Test POST /api/books with no title given", function (done) {
          chai
            .request(server)
            .post("/api/books")
            .send({
              title: "",
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.body.error, "Title Required");
              done();
            });
        });
      }
    );

    suite("GET /api/books => array of books", function () {
      test("Test GET /api/books", function (done) {
        chai
          .request(server)
          .get("/api/books")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "commentcount");
            assert.property(res.body[0], "title");
            assert.property(res.body[0], "bookID");
            assert.property(res.body[0], "comments");
            done();
          });
      });
    });

    suite("GET /api/books/[id] => book object with [id]", function () {
      test("Test GET /api/books/[id] with id not in db", function (done) {
        chai
          .request(server)
          .get("/api/books/1")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "no book exists");
            done();
          });
      });

      test("Test GET /api/books/[id] with valid id in db", function (done) {
        chai
          .request(server)
          .get("/api/books/12345")
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, "title");
            assert.property(res.body, "_id");
            assert.property(res.body, "commentcount");
            assert.property(res.body, "comments");
            done();
          });
      });
    });

    suite(
      "POST /api/books/[id] => add comment/expect book object with id",
      function () {
        test("Test POST /api/books/[id] with comment", function (done) {
          chai
            .request(server)
            .post("/api/books/12345")
            .send({
              comment: "This is test yis",
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.property(res.body, "title");
              assert.equal(res.body._id, 12345);
              assert.equal(res.body.commentcount, 1);
              done();
            });
        });
      }
    );
  });
});
