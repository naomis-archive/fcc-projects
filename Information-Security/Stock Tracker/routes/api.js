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
var mongoose = require("mongoose");
var fetch = require("node-fetch");
const CONNECTION_STRING = process.env.DATABASE;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((error) => console.log(error));

const stocks = new mongoose.Schema({
  stock: { type: String },
  price: { type: Number },
  likes: { type: Number },
  likes_ip: { type: Array },
});

const stock = new mongoose.model("stock", stocks);

async function getprice(symbol) {
  let url = "https://repeated-alpaca.glitch.me/v1/stock/" + symbol + "/quote";
  let response = await fetch(url);
  let data = await response.json();
  let price = data.latestPrice;
  return price;
}
module.exports = function (app) {
  app.route("/api/stock-prices").get(async function (req, res) {
    console.log(req.query.like);
    if (req.query.stock.length !== 2) {
      let price = await getprice(req.query.stock);
      stock.findOne({ stock: req.query.stock }, (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result == null) {
          let newstock = new stock({
            stock: req.query.stock,
            price: price,
            likes: 0,
            likes_ip: [],
          });
          let stockdata = {
            stockData: {
              stock: newstock.stock,
              price: price,
              likes: newstock.likes,
            },
          };
          if (req.query.like == "true") {
            stockdata.stockData.likes = stockdata.stockData.likes + 1;
            newstock.likes = newstock.likes + 1;
            newstock.likes_ip.push(req.ip);
            newstock.save((err) => {
              if (err) {
                console.log(err);
              }
            });
            res.json(stockdata);
          } else {
            newstock.save((err) => {
              if (err) {
                console.log(err);
              }
            });
            res.json(stockdata);
          }
        } else {
          if (result.likes_ip.length !== 0) {
            for (let i = 0; i < result.likes_ip.length; i++) {
              if (result.likes_ip[i] == req.ip) {
                req.query.like = "false";
              }
            }
          }
          result.price = price;
          let stockdata = {
            stockData: {
              stock: result.stock,
              price: price,
              likes: result.likes,
            },
          };
          if (req.query.like == "true") {
            stockdata.stockData.likes = stockdata.stockData.likes + 1;
            result.likes = result.likes + 1;
            result.likes_ip.push(req.ip);
            result.save((err) => {
              if (err) {
                console.log(err);
              }
            });
            res.json(stockdata);
          } else {
            result.save((err) => {
              if (err) {
                console.log(err);
              }
            });
            res.json(stockdata);
          }
        }
      });
    } else if (req.query.stock.length == 2) {
      let price1 = await getprice(req.query.stock[0]);
      let price2 = await getprice(req.query.stock[1]);
      let stockdata = { stockData: [] };
      stock.findOne({ stock: req.query.stock[0] }, (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result == null) {
          let newstock1 = new stock({
            stock: req.query.stock[0],
            price: price1,
            likes: 0,
            likes_ip: [],
          });
          let stock1 = {
            stock: newstock1.stock,
            price: price1,
            likes: newstock1.likes,
          };
          if (req.query.like == "true") {
            newstock1.likes = newstock1.likes + 1;
            newstock1.likes_ip.push(req.ip);
            newstock1.save((err) => {
              if (err) {
                console.log(err);
              }
            });
            stock1.likes = stock1.likes + 1;
            stockdata.stockData.push(stock1);
          } else {
            newstock1.save((err) => {
              if (err) {
                console.log(err);
              }
            });
            stockdata.stockData.push(stock1);
          }
        } else {
          if (result.likes_ip.length !== 0) {
            for (let i = 0; i < result.likes_ip.length; i++) {
              if (result.likes_ip[i] == req.ip) {
                req.query.like = "false";
              }
            }
          }
          result.price = price1;
          let stock1 = {
            stock: result.stock,
            price: price1,
            likes: result.likes,
          };
          if (req.query.like == "true") {
            result.likes = result.likes + 1;
            result.likes_ip.push(req.ip);
            result.save((err) => {
              if (err) {
                console.log(err);
              }
            });
            stock1.likes = stock1.likes + 1;
            stockdata.stockData.push(stock1);
          } else {
            result.save((err) => {
              if (err) {
                console.log(err);
              }
            });
            stockdata.stockData.push(stock1);
          }
        }
      });
      stock.findOne({ stock: req.query.stock[1] }, (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result == null) {
          let newstock2 = new stock({
            stock: req.query.stock[1],
            price: price2,
            likes: 0,
          });
          let stock2 = {
            stock: newstock2.stock,
            price: price2,
            likes: newstock2.likes,
          };

          if (req.query.like == "true") {
            newstock2.likes = newstock2.likes + 1;
            newstock2.likes_ip.push(req.ip);
            newstock2.save((err) => {
              if (err) {
                console.log(err);
              }
            });
            stock2.likes = stock2.likes + 1;
            stockdata.stockData.push(stock2);
            stockdata.stockData[0].rel_likes =
              stockdata.stockData[0].likes - stockdata.stockData[1].likes;
            stockdata.stockData[1].rel_likes =
              stockdata.stockData[1].likes - stockdata.stockData[0].likes;
            delete stockdata.stockData[0].likes;
            delete stockdata.stockData[1].likes;
            res.json(stockdata);
          } else {
            newstock2.save((err) => {
              if (err) {
                console.log(err);
              }
            });
            stockdata.stockData.push(stock2);
            stockdata.stockData[0].rel_likes =
              stockdata.stockData[0].likes - stockdata.stockData[1].likes;
            stockdata.stockData[1].rel_likes =
              stockdata.stockData[1].likes - stockdata.stockData[0].likes;
            delete stockdata.stockData[0].likes;
            delete stockdata.stockData[1].likes;
            res.json(stockdata);
          }
        } else {
          if (result.likes_ip.length !== 0) {
            for (let i = 0; i < result.likes_ip.length; i++) {
              if (result.likes_ip[i] == req.ip) {
                req.query.like = "false";
              }
            }
          }
          let stock2 = {
            stock: result.stock,
            price: price2,
            likes: result.likes,
          };
          if (req.query.like == "true") {
            result.likes = result.likes + 1;
            result.likes_ip.push(req.ip);
            result.price = price2;
            result.save((err) => {
              if (err) {
                console.log(err);
              }
            });
            stock2.likes = stock2.likes + 1;
            stockdata.stockData.push(stock2);
            stockdata.stockData[0].rel_likes =
              stockdata.stockData[0].likes - stockdata.stockData[1].likes;
            stockdata.stockData[1].rel_likes =
              stockdata.stockData[1].likes - stockdata.stockData[0].likes;
            delete stockdata.stockData[0].likes;
            delete stockdata.stockData[1].likes;
            res.json(stockdata);
          } else {
            result.price = price2;
            result.save((err) => {
              if (err) {
                console.log(err);
              }
            });
            stockdata.stockData.push(stock2);
            stockdata.stockData[0].rel_likes =
              stockdata.stockData[0].likes - stockdata.stockData[1].likes;
            stockdata.stockData[1].rel_likes =
              stockdata.stockData[1].likes - stockdata.stockData[0].likes;
            delete stockdata.stockData[0].likes;
            delete stockdata.stockData[1].likes;
            res.json(stockdata);
          }
        }
      });
    }
  });
};
