"use strict";

var express = require('express');

var mysql = require("mysql");

var datab = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: 'vipul123',
  database: 'database'
});