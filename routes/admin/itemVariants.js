//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  listAllItemVariant,
  addItemVariant,
  updateItemVariant,
  deleteItemVariant,
} = require("../../controllers/itemVariantsController");

//--> List all items <--
router.get("/list", listAllItemVariant);

//--> Add a item <--
router.post("/add", addItemVariant);

//--> Update a item <--
router.put("/update/:id", updateItemVariant);

//--> Delete a item <--
router.delete("/delete/:id", deleteItemVariant);

module.exports = router;
