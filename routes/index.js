//--> Module dependencies.<--
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send(
    "Welcome to my api, for usage of my api you can read to documentation of my api."
  );
});

module.exports = router;
