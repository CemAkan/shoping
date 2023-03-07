//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  addSimilarItems,
  listAllSimilarItems,
  updateSimilarItems,
  deleteSimilarItems,
} = require("../../controllers/similarItemsController");

//--> List all items <--
router.get("/list", listAllSimilarItems);

//--> Add a item <--
router.post("/add", addSimilarItems);

//--> Update a item <--
router.put("/update/:id", updateSimilarItems);

//--> Delete a item <--
router.delete("/delete/:id", deleteSimilarItems);

module.exports = router;
