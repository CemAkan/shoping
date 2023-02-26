var express = require("express");
var router = express.Router();

//--> routes for cart <--

//--> list all items that were added to cart list<--
router.get("/list", function (req, res, next) {});
//--> get total price of all items that were added to cart list<--
router.get("/price", function (req, res, next) {});
//--> add items to cart list<--
router.post("/add", function (req, res, next) {});

module.exports = router;
