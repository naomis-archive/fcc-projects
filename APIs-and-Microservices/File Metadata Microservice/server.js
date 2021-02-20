'use strict';
//variables
var express = require('express');
var cors = require('cors');
var multer = require('multer')
// require and use "multer"...
var upload = multer.memoryStorage()
var fileloc = multer({storage: upload})
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});
//get metadata from file upload
app.post("/api/fileanalyse", fileloc.single('upfile'),function(req, res){
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
  })
//listener
app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
