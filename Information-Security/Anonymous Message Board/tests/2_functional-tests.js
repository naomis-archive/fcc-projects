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

suite("Functional Tests", function() {
  suite("API ROUTING FOR /api/threads/:board", function() {
    suite("POST", function() {
      test("Post thread to board General", function(done) {
        chai
          .request(server)
          .post("/api/threads/general")
          .send({
            text: "Post thread to board General",
            delete_password: "delete",
            thread_id: "test_thread"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.text, "Post thread to board General");
            done();
          });
      });

      test("Create delete thread", function(done) {
        chai
          .request(server)
          .post("/api/threads/general")
          .send({
            text: "Create delete thread",
            delete_password: "delete",
            thread_id: "delete_thread"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            done();
          });
      });

      test("Create report thread", function(done) {
        chai
          .request(server)
          .post("/api/threads/general")
          .send({
            text: "Create report thread",
            delete_password: "delete",
            thread_id: "report_thread"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            done();
          });
      });
    });

    suite("GET", function() {
      test("Get board General", function(done) {
        chai
          .request(server)
          .get("/api/threads/general")
          .end(function(err, res) {
            assert.equal(res.status, 200);
            console.log(res.body);
            assert.property(res.body[0], "thread_id");
            assert.property(res.body[0], "replies");
            assert.property(res.body[0], "text");
            done();
          });
      });
    });

    suite("DELETE", function() {
      test("Delete topic", function(done) {
        chai
          .request(server)
          .delete("/api/threads/general")
          .send({
            thread_id: "delete_thread",
            delete_password: "delete"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "Success");
            done();
          });
      });

      test("Delete failed", function(done) {
        chai
          .request(server)
          .delete("/api/threads/general")
          .send({
            thread_id: "test_thread",
            delete_password: "deleeet"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "Incorrect Password");
            done();
          });
      });
    });

    suite("PUT", function() {
      test("Report thread", function(done) {
        chai
          .request(server)
          .put("/api/threads/general")
          .send({
            thread_id: "report_thread"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "Success");
            done();
          });
      });

      test("Report failure", function(done) {
        chai
          .request(server)
          .put("/api/threads/general")
          .send({
            thread_id: "fake_thread"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "Invalid thread ID");
            done();
          });
      });
    });
  });

  suite("API ROUTING FOR /api/replies/:board", function() {
    suite("POST", function() {
      test("Reply to thread", function(done) {
        chai
          .request(server)
          .post("/api/replies/general")
          .send({
            thread_id: "test_thread",
            text: "test reply",
            reply_id: "test_reply",
            delete_password: "delete"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.text, "Post thread to board General");
            done();
          });
      });

      test("Create Report reply", function(done) {
        chai
          .request(server)
          .post("/api/replies/general")
          .send({
            thread_id: "test_thread",
            text: "Report reply",
            reply_id: "report_reply",
            delete_password: "delete"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            done();
          });
      });

      test("Create Delete reply", function(done) {
        chai
          .request(server)
          .post("/api/replies/general")
          .send({
            thread_id: "test_thread",
            text: "Delete reply",
            reply_id: "delete_reply",
            delete_password: "delete"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            done();
          });
      });
    });

    suite("GET", function() {
      test("Get replies general", function(done) {
        chai
          .request(server)
          .get("/api/replies/general")
          .query({
            thread_id: "test_thread"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, "thread_id");
            assert.isAbove(res.body.replies.length, 0);
            done();
          });
      });
    });

    suite("PUT", function() {
      test("Report reply", function(done) {
        chai
          .request(server)
          .put("/api/replies/general")
          .send({
            thread_id: "test_thread",
            reply_id: "report_reply"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "Success");
            done();
          });
      });

      test("Report wrong reply", function(done) {
        chai
          .request(server)
          .put("/api/replies/general")
          .send({
            thread_id: "test_thread",
            reply_id: "fake_reply"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "Invalid reply ID");
            done();
          });
      });

      test("Report wrong reply thread", function(done) {
        chai
          .request(server)
          .put("/api/replies/general")
          .send({
            thread_id: "fake_thread",
            reply_id: "fake_reply"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "Invalid thread ID");
            done();
          });
      });
    });

    suite("DELETE", function() {
      test("Delete reply", function(done) {
        chai
          .request(server)
          .delete("/api/replies/general")
          .send({
            thread_id: "test_thread",
            reply_id: "delete_reply",
            delete_password: "delete"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "Success");
            done();
          });
      });

      test("Delete wrong reply", function(done) {
        chai
          .request(server)
          .delete("/api/replies/general")
          .send({
            thread_id: "test_thread",
            reply_id: "fake_reply",
            delete_password: "delete"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "Incorrect reply ID or password");
            done();
          });
      });

      test("Delete wrong reply thread", function(done) {
        chai
          .request(server)
          .delete("/api/replies/general")
          .send({
            thread_id: "fake_thread",
            reply_id: "delete_reply",
            delete_password: "delete"
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "Invalid thread ID");
            done();
          });
      });
    });
  });
});
