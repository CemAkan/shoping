//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  add,
  list,
  update,
  deleting,
} = require("../../controllers/categoryControler");

//--> List all categories <--
router.get("/list", list);

//--> Add a category <--
router.post("/add", add);

//--> Update a category <--
router.put("/update", update);

//--> Delete a category <--
router.delete("/delete/:id", deleting);

module.exports = router;
