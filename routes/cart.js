var express = require("express");
var router = express.Router();

//--> routes for cart <--

//--> list all items that were added to cart list<--
router.get("/cart", function (req, res, next) {});
//--> add items to cart list<--
router.post("/cart", function (req, res, next) {});

module.exports = router;
