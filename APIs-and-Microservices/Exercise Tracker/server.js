//variables
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");
const mongo = require("mongodb");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
//databases

const exerciseList = new mongoose.Schema(
  {
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: false },
    username: { type: String },
    userId: { type: String, ref: "userList", index: true },
  },
  { versionKey: false }
);
const userList = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    userId: { type: String, unique: true },
  },
  { versionKey: false }
);

const exercise = mongoose.model("exercise", exerciseList);
const user = mongoose.model("user", userList);

//create new user
app.post("/api/exercise/new-user", function (req, res, next) {
  let username = req.body.username;
  let id = Math.floor(Math.random() * 1000000);
  let newuser = new user({ username: username, userId: id });
  newuser.save(function (err) {
    if (err) return next(console.log(err));
  });
  let result = {
    username: newuser.username,
    _id: newuser.userId,
  };
  res.json(result);
});
//create new exercise
app.post("/api/exercise/add", function (req, res) {
  let id = req.body.userId;
  user.findOne({ userId: id }, function (err, data) {
    if (err) {
      return console.log(err);
    }
    let description = req.body.description;
    let duration = req.body.duration;
    let date = Date.now();
    if (req.body.date !== undefined) {
      date = req.body.date;
    }
    let newexercise = new exercise({
      description: description,
      duration: duration,
      date: date,
      userId: id,
      username: data.username,
    });
    if (err) {
      return console.log(err);
    }
    newexercise.save(function (err, save) {
      if (err) {
        console.log(err);
      }
    });
    let result = {
      username: newexercise.username,
      description: newexercise.description,
      duration: newexercise.duration,
      _id: newexercise.userId,
      date: new Date(newexercise.date).toDateString(),
    };
    res.json(result);
  });
});
//get userList
app.get("/api/exercise/users", function (req, res) {
  user.find({}, "-_id", function (err, data) {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

//get log
app.get("/api/exercise/log", function (req, res) {
  let userId = req.query.userId;
  let from = new Date(req.query.from);
  let to = new Date(req.query.to);
  let limit = Number(req.query.limit);
  user.findOne({ userId: userId }, function (err, user) {
    if (err) {
      console.log(err);
    }
    exercise
      .find({
        userId: userId,
        date: {
          $lt: to != "Invalid Date" ? to.getTime() : Date.now(),
          $gt: from != "Invalid Date" ? from.getTime() : 0,
        },
      })
      .sort("-date")
      .limit(limit)
      .exec(function (err, data) {
        let result = {
          _id: req.query.userId,
          username: user.username,
          from: from != "Invalid Date" ? from.toDateString() : undefined,
          to: to != "Invalid Date" ? to.toDateString() : undefined,
          count: data.length,
          log: data.map((e) => ({
            description: e.description,
            duration: e.duration,
            date: e.date.toDateString(),
          })),
        };
        res.json(result);
      });
  });
});
//listener
app.post("");
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
