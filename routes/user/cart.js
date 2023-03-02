//--> Module dependencies <--
var express = require("express");
var router = express.Router();
var {
  deleteAllItems,
  deleteOneItem,
  addItem,
  updateItem,
  listAllItems,
  totalPrice,
} = require("../../controllers/cartControler");

//--> routes for cart <--

//--> list all items that were added to cart <--
router.get("/list/:id", listAllItems); //id = customerId

//--> get total price of all items that were added to cart <--
router.get("/price/:id", totalPrice); //id = customerId

//--> add items to cart <--
router.post("/add", addItem); //id = customerId

//--> update a item in cart <--
router.put("/update", updateItem); //id = id

//--> delete a item in cart <--
router.delete("/delete-one/:id", deleteOneItem); //id = id

//--> delete cart <--
router.delete("/delete-all/:id", deleteAllItems); //id = customerId

//exporting
module.exports = router;
