//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
//controller requirement will comes here

//--> List all items <--
router.get("/list");

//--> Add a item <--
router.post("/add");

//--> Update a item <--
router.put("/update/:id");

//--> Delete a item <--
router.delete("/delete/:id");

module.exports = router;
