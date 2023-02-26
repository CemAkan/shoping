var express = require("express");
var router = express.Router();

//--> routes for like <--

//--> list all items that were added to like list <--
router.get("/list", function (req, res, next) {});
//--> add items to like list<--
router.post("/add", function (req, res, next) {});

module.exports = router;
