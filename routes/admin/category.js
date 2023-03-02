//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  deleteCategory,
  addCategory,
  listAllCategory,
  updateCategory,
} = require("../../controllers/categoryControler");

//--> List all categories <--
router.get("/list", listAllCategory);

//--> Add a category <--
router.post("/add", addCategory);

//--> Update a category <--
router.put("/update", updateCategory);

//--> Delete a category <--
router.delete("/delete/:id", deleteCategory);

module.exports = router;
