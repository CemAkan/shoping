//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var Item = require("../../controllers/itemControler");

//--> List all items <--
router.get("/list", Item.list);

//--> Add a item <--
router.post("/add/:id", Item.add);

//--> Update a item <--
router.put("/update/:id", Item.update);

//--> Delete a item <--
router.delete("/delete/:id", Item.delete);

module.exports = router;
