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
router.get("/list/:phone", listAllItems);

//--> get total price of all items that were added to cart <--
router.get("/price/:phone", totalPrice);

//--> add items to cart <--
router.post("/add", addItem);

//--> update a item in cart <--
router.put("/update/:id", updateItem); //id = id

//--> delete a item in cart <--
router.delete("/delete-one/:id", deleteOneItem); //id = id

//--> delete cart <--
router.delete("/delete-all/:phone", deleteAllItems);

//exporting
module.exports = router;
