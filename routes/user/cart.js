//--> Module dependencies <--
var express = require("express");
var router = express.Router();
var Carts = require("../../controllers/cartControl");

//--> routes for cart <--

//--> list all items that were added to cart list<--
router.get("/list/:id", Carts.list);
//--> get total price of all items that were added to cart list<--
router.get("/price/:id", Carts.price);

//--> add items to cart list <--
router.post("/add/:id", Carts.add);

//exporting
module.exports = router;
