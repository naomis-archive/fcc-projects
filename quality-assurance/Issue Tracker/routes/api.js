/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb");
var ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");
const express = require("express");

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((error) => console.log(error));

const issueList = new mongoose.Schema({
  issueID: { type: Number },
  project_name: { type: String },
  issue_title: { type: String, required: true, default: "ERROR" },
  issue_text: { type: String, required: true, default: "ERROR" },
  created_by: { type: String, required: true, default: "ERROR" },
  assigned_to: { type: String, required: false },
  status_text: { type: String, required: false },
  created_on: { type: String, required: false },
  updated_on: { type: String, required: false },
  open: { type: Boolean, default: true },
});
const issue = mongoose.model("issue", issueList);

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      var project = req.params.project;
      var filter = { project_name: project };
      if (req.query.issue_title !== undefined) {
        filter.issue_title = req.query.issue_title;
      }
      if (req.query.issue_text !== undefined) {
        filter.issue_text = req.query.issue_text;
      }
      if (req.query.created_by !== undefined) {
        filter.created_by = req.query.created_by;
      }
      if (req.query.assigned_to !== undefined) {
        filter.assigned_to = req.query.assigned_to;
      }
      if (req.query.status_text !== undefined) {
        filter.status_text = req.query.status_text;
      }
      if (req.query.open == "false") {
        filter.open = false;
      }
      if (req.query.open == "true") {
        filter.open = true;
      }
      issue.find(filter, (err, result) => {
        if (result.length == 0 || err) {
          res.json({
            Error: "No issues found, check your parameters and try again",
          });
        } else {
          res.json(result);
        }
      });
    })

    .post(function (req, res) {
      var project = req.params.project;
      var id = Math.floor(Math.random() * 1000000);
      id = id.toString();
      if (req.body.issueID !== undefined) {
        id = req.body.issueID;
      }
      var currentDate = new Date(Date.now()).toDateString();
      let newIssue = new issue({
        issueID: id,
        project_name: project,
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text,
        created_on: currentDate,
        updated_on: currentDate,
        open: true,
      });
      newIssue.save((err) => {
        if (err) {
          console.log(err);
        }
      });
      res.json({
        _id: id,
        project_name: project,
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text,
        created_on: currentDate,
        open: true,
      });
    })

    .put(function (req, res) {
      var project = req.params.project;
      var id = req.body._id;
      var currentDate = new Date(Date.now()).toDateString();
      var filter = { issueID: id };
      var update = { updated_on: currentDate };
      if (req.body.issue_title !== "" && req.body.issue_title !== undefined) {
        update.issue_title = req.body.issue_title;
      }
      if (req.body.issue_text !== "" && req.body.issue_text !== undefined) {
        update.issue_text = req.body.issue_text;
      }
      if (req.body.created_by !== "" && req.body.created_by !== undefined) {
        update.created_by = req.body.created_by;
      }
      if (req.body.assigned_to !== "" && req.body.assigned_to !== undefined) {
        update.assigned_to = req.body.assigned_to;
      }
      if (req.body.status_text !== "" && req.body.status_text !== undefined) {
        update.status_text = req.body.status_text;
      }
      if (req.body.open == false) {
        update.open = false;
      }
      let updateKeys = Object.keys(update);
      if (updateKeys.length == 1) {
        return res.json({ status: "No updated field sent" });
      } else {
        issue.findOneAndUpdate(filter, update, { new: true }, (err, result) => {
          if (result == null || err) {
            res.json({ status: "could not update " + id });
          } else {
            res.json({ status: "Successfully updated" });
          }
        });
      }
    })

    .delete(function (req, res) {
      var project = req.params.project;
      var id = req.body._id;
      issue.findOne(
        {
          issueID: id,
        },
        function (err, result) {
          if (result == null || err) {
            res.json({ error: "_id error" });
          } else {
            issue.deleteOne(
              {
                issueID: id,
              },
              function (err, result) {
                if (err) {
                  res.json({ failed: "could not delete " + id });
                } else {
                  res.json({ success: "deleted " + id });
                }
              }
            );
          }
        }
      );
    });
};
