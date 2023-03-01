//--> Module dependencies <--
var express = require("express");
var router = express.Router();
var {
  deleteAll,
  deleteOne,
  update,
  add,
  list,
  price,
} = require("../../controllers/cartControler");

//--> routes for cart <--

//--> list all items that were added to cart <--
router.get("/list/:id", list); //id = customerId

//--> get total price of all items that were added to cart <--
router.get("/price/:id", price); //id = customerId

//--> add items to cart <--
router.post("/add", add); //id = customerId

//--> update a item in cart <--
router.put("/update/:id", update); //id = id

//--> delete a item in cart <--
router.delete("/delete-one/:id", deleteOne); //id = id

//--> delete cart <--
router.delete("/delete-all/:id", deleteAll); //id = customerId

//exporting
module.exports = router;
