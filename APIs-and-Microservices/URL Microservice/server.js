"use strict";

var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
var dns = require("dns");
var app = express();

// Basic Configuration
var port = process.env.PORT || 3000;

/** this project needs a db !! **/

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const urlDatabase = new mongoose.Schema({
  urlvalue : {type: String, required: true},
  index: {type: String, required: true}
})
const urlItem = mongoose.model("urlItem", urlDatabase)
app.use(cors());

/** this project needs to parse POST bodies **/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});
app.get("/api/shorturl/:index", function(req, res) {
  let reqIndex = req.params.index
  urlItem.findOne({index: reqIndex}, function(err, data) {
    if(err){console.log(err)}
    if(data){
    res.redirect(data.urlvalue)}
    else res.send("URL Not Found")
            
  })
})
app.post("/api/shorturl/new", function(req, res) {
  let url = req.body.url;
  let hostname = url.slice(7)
  if (url.charAt(4) == "s"){
    hostname = url.slice(8)
  }
  for (let iteration = 0; iteration < hostname.length; iteration++){
    if (hostname.charAt(iteration) == "/") {
      hostname = hostname.slice(0, iteration)
      }
  }
  console.log(hostname)
  let urlIndex = Math.floor(Math.random()*10000)
  dns.lookup(hostname, function(err) {
    if(err)
      res.json({ERROR: "Invalid Short URL"})
  else {
  let thisurl = new urlItem({urlvalue: url, index: urlIndex})
  thisurl.save(function(err){if(err)console.log(err)})
  console.log(thisurl)
  let shorturl = "https://free-valuable-guilty.glitch.me/api/shorturl/" + urlIndex
  res.json({ original_url: url, short_url: shorturl});
  }})});
app.listen(port, function() {
  console.log("Node.js listening ...");
});
