/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DATABASE;
var mongoose = require("mongoose");
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((error) => console.log(error));

const books = new mongoose.Schema(
  {
    bookID: { type: Number },
    title: { type: String },
    comments: { type: Array, default: [] },
    commentcount: { type: Number, default: 0 },
  },
  { versionKey: false }
);

const book = new mongoose.model("book", books);
module.exports = function (app) {
  app
    .route("/api/books")
    .get(function (req, res) {
      book.find({}, { _id: 0 }).then(function (books) {
        res.json(books);
      });
    })

    .post(function (req, res) {
      console.log("Title = <" + req.body.title + ">");
      if (req.body.title == "") {
        res.json({ error: "Title Required" });
      } else {
        var title = req.body.title;
        let id = Math.floor(Math.random() * 1000000);
        if (req.body.bookID !== null) {
          id = req.body.bookID;
        }
        let newBook = new book({
          bookID: id,
          title: title,
        });
        newBook.save((err) => {
          if (err) console.log(err);
        });
        res.json({ _id: id, title: title });
      }
    })

    .delete(function (req, res) {
      book.deleteMany({}, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ status: "complete delete successful" });
        }
      });
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      var bookid = req.params.id;
      book.findOne({ bookID: bookid }, (err, result) => {
        if (err || result == null) {
          res.json({ error: "no book exists" });
        } else {
          res.json({
            _id: result.bookID,
            title: result.title,
            comments: result.comments,
            commentcount: result.commentcount,
          });
        }
      });
    })

    .post(function (req, res) {
      var bookid = req.params.id;
      var comment = req.body.comment;
      book.findOne({ bookID: bookid }, (err, result) => {
        if (err) {
          console.log(err);
        }
        result.comments.push(comment);
        result.commentcount = result.commentcount + 1;
        result.save();
        res.json({
          _id: result.bookID,
          title: result.title,
          comments: result.comments,
          commentcount: result.commentcount,
        });
      });
    })

    .delete(function (req, res) {
      var bookid = req.params.id;
      book.deleteOne({ bookID: bookid }, (err, result) => {
        if (err || result == null) {
          res.send("ID Not Found");
        } else {
          res.send("Delete successful");
        }
      });
    });
};
