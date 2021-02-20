/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .catch(error => console.log(error));

const threads = new mongoose.Schema({
  thread_id: { type: String },
  text: { type: String },
  created_on: { type: Date },
  bumped_on: { type: Date },
  reported: { type: Boolean },
  delete_password: { type: String },
  replies: { type: Array }
});

const thread = new mongoose.model("thread", threads);

module.exports = function(app) {
  app
    .route("/api/threads/:board")
    .post(function(req, res) {
      const currentDate = new Date(Date.now()).toDateString();
      const newThread = new thread({
        thread_id:
          Math.floor(Math.random() * 1000000) + "_thread_" + req.body.board,
        text: req.body.text,
        created_on: currentDate,
        bumped_on: currentDate,
        reported: false,
        delete_password: req.body.delete_password,
        replies: []
      });
      if (req.body.thread_id) {
        newThread.thread_id = req.body.thread_id;
      }
      newThread.save(err => {
        if (err) {
          console.log(err);
        }
      });
      res.json(newThread);
    })
    .get(function(req, res) {
      thread
        .find()
        .sort({ bumped_on: -1 })
        .limit(10)
        .select("-reported -delete_id -_id")
        .exec(function(err, threads) {
          if (err) {
            console.log(err);
          }
          threads.forEach(function(thread) {
            if (thread.replies.length >= 3) {
              thread.replies.splice(0, 3);
            }
            if (thread.replies.length >= 1) {
              for (let i = 0; i < thread.replies.length; i++) {
                delete thread.replies[i].delete_password;
                delete thread.replies[i].reported;
              }
              delete thread.delete_password;
              delete thread.reported;
              thread._id = thread.thread_id;
            }
          });
          res.json(threads);
        });
    })
    .put(function(req, res) {
      thread.findOne({ thread_id: req.body.thread_id }, function(err, thread) {
        if (err || !thread) {
          res.send("Invalid thread ID");
        } else {
          (thread.reported = true),
            thread.save(err => {
              if (err) {
                console.log(err);
              }
            });
          {
            res.send("Success");
          }
        }
      });
    })
    .delete(function(req, res) {
      thread.deleteOne(
        {
          thread_id: req.body.thread_id,
          delete_password: req.body.delete_password
        },
        function(err, result) {
          if (err || result.n == 0) {
            res.send("Incorrect Password");
          } else {
            res.send("Success");
          }
        }
      );
    });

  app
    .route("/api/replies/:board")
    .post(function(req, res) {
      const currentDate = new Date(Date.now()).toDateString();
      const newReply = {
        reply_id: Math.floor(Math.random() * 1000000) + "_reply",
        text: req.body.text,
        created_on: currentDate,
        reported: false,
        delete_password: req.body.delete_password
      };
      if (req.body.reply_id) {
        newReply.reply_id = req.body.reply_id;
      }
      thread.findOne({ thread_id: req.body.thread_id }, function(err, result) {
        if (err || !result) {
          res.json({ Error: "Thread not found" });
        } else {
          result.bumped_on = currentDate;
          result.replies.push(newReply);
          result.save(err => {
            if (err) {
              console.log(err);
            }
          });
          res.json(result);
        }
      });
    })
    .get(function(req, res) {
      thread
        .findOne({ thread_id: req.query.thread_id })
        .exec(function(err, thread) {
          for (let i = 0; i < thread.replies.length; i++) {
            delete thread.replies[i].delete_password;
            delete thread.replies[i].reported;
          }
          delete thread.reported;
          delete thread.delete_password;
          res.json(thread);
        });
    })
    .put(function(req, res) {
      thread
        .findOne({ thread_id: req.body.thread_id })
        .exec(function(err, thread) {
          if (err || !thread) {
            res.send("Invalid thread ID");
          } else {
            for (let i = 0; i < thread.replies.length; i++) {
              if (thread.replies[i].reply_id == req.body.reply_id) {
                thread.replies[i].reported = true;
                thread.save(err => {
                  if (err) {
                    console.log(err);
                  }
                });
                res.send("Success");
                return;
              }
            }
            {
              res.send("Invalid reply ID");
            }
          }
        });
    })
    .delete(function(req, res) {
      thread
        .findOne({ thread_id: req.body.thread_id })
        .exec(function(err, thread) {
          if (err || !thread) {
            res.send("Invalid thread ID");
          } else {
            for (let i = 0; i < thread.replies.length; i++) {
              if (
                thread.replies[i].reply_id === req.body.reply_id &&
                thread.replies[i].delete_password === req.body.delete_password
              ) {
                thread.replies.splice(i, 1);
                thread.save();
                res.send("Success");
                return;
              }
            }
            res.send("Incorrect reply ID or password");
          }
        });
    });
};
