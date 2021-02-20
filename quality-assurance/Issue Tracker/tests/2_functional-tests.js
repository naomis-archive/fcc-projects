/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("POST /api/issues/{project} => object with issue data", function () {
    test("Every field filled in", function (done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issueID: 12345,
          issue_title: "Title",
          issue_text: "text",
          created_by: "Functional Test - Every field filled in",
          assigned_to: "Chai and Mocha",
          status_text: "In QA",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.project_name, "test");
          assert.equal(res.body.issue_title, "Title");
          assert.equal(res.body.issue_text, "text");
          assert.equal(
            res.body.created_by,
            "Functional Test - Every field filled in"
          );
          assert.equal(res.body.assigned_to, "Chai and Mocha");
          assert.equal(res.body.status_text, "In QA");
          done();
        });
    });

    test("Required fields filled in", function (done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issueID: 54321,
          issue_title: "Required",
          issue_text: "Required",
          created_by: "Functional Test - Required fields filled in",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.project_name, "test");
          assert.equal(res.body.issue_title, "Required");
          assert.equal(res.body.issue_text, "Required");
          assert.equal(
            res.body.created_by,
            "Functional Test - Required fields filled in"
          );
          done();
        });
    });

    test("Missing required fields", function (done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          status_text: "Hello!",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, undefined);
          done();
        });
    });
  });

  suite("PUT /api/issues/{project} => text", function () {
    test("No body", function (done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .send({
          _id: 12345,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.status, "No updated field sent");
          done();
        });
    });

    test("One field to update", function (done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .send({
          _id: 12345,
          created_by: "Functional Test - One field to update",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.status, "Successfully updated");
          done();
        });
    });

    test("Multiple fields to update", function (done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .send({
          _id: 54321,
          created_by: "Functional Test - Multiple fields to update",
          issue_text: "Update",
          assigned_to: "No one",
          status_text: "updated",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.status, "Successfully updated");
          done();
        });
    });
  });

  suite(
    "GET /api/issues/{project} => Array of objects with issue data",
    function () {
      test("No filter", function (done) {
        chai
          .request(server)
          .get("/api/issues/test")
          .query({})
          .end(function (err, res) {
            console.log(res.body);
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "issue_title");
            assert.property(res.body[0], "issue_text");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "updated_on");
            assert.property(res.body[0], "created_by");
            assert.property(res.body[0], "assigned_to");
            assert.property(res.body[0], "open");
            assert.property(res.body[0], "status_text");
            assert.property(res.body[0], "_id");
            done();
          });
      });

      test("One filter", function (done) {
        chai
          .request(server)
          .get("/api/issues/test")
          .query({ issue_title: "Title" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body[0].issue_title, "Title");
            done();
          });
      });

      test("Multiple filters (test for multiple fields you know will be in the db for a return)", function (done) {
        chai
          .request(server)
          .get("/api/issues/test")
          .query({ issue_title: "Title", issue_text: "text" })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body[0].issue_title, "Title");
            assert.equal(res.body[0].issue_text, "text");
            done();
          });
      });
    }
  );

  suite("DELETE /api/issues/{project} => text", function () {
    test("No _id", function (done) {
      chai
        .request(server)
        .delete("/api/issues/test")
        .send({
          _id: 3,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "_id error");
          done();
        });
    });

    test("Valid _id", function (done) {
      chai
        .request(server)
        .delete("/api/issues/test")
        .send({
          _id: 54321,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.success, "deleted 54321");
          done();
        });
    });
  });
});
