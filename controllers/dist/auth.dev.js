"use strict";

exports.register = function (req, res) {
  console.log(req.body);
  res.send("form submitted");
};