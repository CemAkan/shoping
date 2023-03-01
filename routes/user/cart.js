//--> Module dependencies <--
var express = require("express");
var router = express.Router();
var Carts = require("../../controllers/cartControler");

//--> routes for cart <--

//--> list all items that were added to cart <--
router.get("/list/:id", Carts.list); //id = customerId

//--> get total price of all items that were added to cart <--
router.get("/price/:id", Carts.price); //id = customerId

//--> add items to cart <--
router.post("/add/:id", Carts.add); //id = customerId

//--> update a item in cart <--
router.put("/update/:id", Carts.update); //id = id

//--> delete a item in cart <--
router.delete("/delete-one/:id", Carts.deleteOne); //id = id

//--> delete cart <--
router.delete("/delete-all/:id", Carts.deleteAll); //id = customerId

//exporting
module.exports = router;
