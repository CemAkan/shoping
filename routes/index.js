//--> Module dependencies.<--
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send(
    "Welcome to first version of shoping api, for usage of my api you can read to documentation."
  );
});

module.exports = router;
