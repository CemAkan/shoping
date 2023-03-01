//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  add,
  list,
  update,
  deleting,
} = require("../../controllers/itemControler");

//--> List all items <--
router.get("/list", list);

//--> Add a item <--
router.post("/add", add);

//--> Update a item <--
router.put("/update/:id", update);

//--> Delete a item <--
router.delete("/delete/:id", deleting);

module.exports = router;
