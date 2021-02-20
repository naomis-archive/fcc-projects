var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// --> 7)  Mount the Logger middleware here
app.use(function (req, res, next) {
  let method = req.method;
  let path = req.path;
  let ip = req.ip;
  console.log(method + " " + path + " - " + ip);
  next();
});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/** 1) Meet the node console. */
//console.log("Hello world")

/** 2) A first working Express Server */
/*app.get("/", function(req, res) {
  res.send("Hello Express");
})*/

/** 3) Serve an HTML file */
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
app.get("/JSON", function (req, res) {
  res.json({ message: "Hello json" });
});

/** 6) Use the .env file to configure the app */
app.get("/JSON", function (req, res) {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else res.json({ message: "Hello json" });
});

/** 7) Root-level Middleware - A logger */
//  above

/** 8) Chaining middleware. A Time server */
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({ time: req.time });
  }
);

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", function (req, res) {
  let word = req.params.word;
  res.json({ echo: word });
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", function (req, res) {
  let first = req.query.first;
  let last = req.query.last;
  res.json({ name: first + " " + last });
});
/** 11) Get ready for POST Requests - the `body-parser` */
// above

/** 12) Get data form POST  */
app.post("/name", function (req, res) {
  let first = req.body.first;
  let last = req.body.last;
  res.json({ name: first + " " + last });
});

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
