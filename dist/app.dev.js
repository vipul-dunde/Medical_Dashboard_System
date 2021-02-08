"use strict";

var express = require("express");

var path = require('path');

var mysql = require("mysql");

var dotenv = require("dotenv");

var bodyparsor = require("body-parser");

dotenv.config({
  path: './.env'
});
var app = express();
var datab = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '#yourpassword',
  database: '#databasename'
});
var publicDirectory = path.join(__dirname + '/public');
var viewDirectory = path.join(__dirname + './views');
app.set('view engine', 'hbs');
app.use(express["static"](publicDirectory));
app.use(express["static"](viewDirectory));
datab.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL CONNECTED");
  }
}); // grab data from form

app.use(express["static"](publicDirectory));
app.use(express.urlencoded({
  extended: false
}));
app.use(bodyparsor.json());
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.listen(5000, function () {
  console.log("Project connected to port 5000");
}); //tables

app.get("/users", function (req, res) {
  var sql = "SELECT * FROM USERS";
  datab.query(sql, function (error, rows, fields) {
    if (!error) res.send(rows);else console.log(error);
  });
});
app.get("/shownurse", function (req, res) {
  var sql = "SELECT * FROM ADDNURSE";
  datab.query(sql, function (error, rows, fields) {
    if (!error) res.send(rows);else console.log(error);
  });
});
app.get("/showdoctor", function (req, res) {
  var sql = "SELECT * FROM ADDDOCTOR";
  datab.query(sql, function (error, rows, fields) {
    if (!error) res.send(rows);else console.log(error);
  });
});
app.get("/showstaff", function (req, res) {
  var sql = "SELECT * FROM ADDSTAFF";
  datab.query(sql, function (error, rows, fields) {
    if (!error) res.send(rows);else console.log(error);
  });
});
app.get("/showpatient", function (req, res) {
  var sql = "SELECT * FROM ADDPATIENT";
  datab.query(sql, function (error, rows, fields) {
    if (!error) res.send(rows);else console.log(error);
  });
});
app.get("/emergency", function (req, res) {
  var sql2 = "SELECT * FROM  EMERGENCYE";
  datab.query(sql2, function (error, rows, fields) {
    if (!error) res.send(rows); // res.send("g=hello");
    else console.log(error);
  });
});
app.get("/complainss", function (req, res) {
  var sql = "SELECT * FROM COMPLAIN";
  datab.query(sql, function (error, rows, fields) {
    if (!error) res.send(rows); // res.send("g=hello");
    else console.log(error);
  });
});