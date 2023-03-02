//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  addItem,
  listAllItem,
  updateItem,
  deleteItem,
} = require("../../controllers/itemControler");

//--> List all items <--
router.get("/list", listAllItem);

//--> Add a item <--
router.post("/add", addItem);

//--> Update a item <--
router.put("/update:id", updateItem);

//--> Delete a item <--
router.delete("/delete/:id", deleteItem);

module.exports = router;
