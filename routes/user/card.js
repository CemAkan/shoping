//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
//controller requirement will comes here

//--> List all cards <--
router.get("/list");

//--> Add a card <--
router.post("/add");

//--> Update a card <--
router.put("/update/:id");

//--> Delete a card <--
router.delete("/delete/:id");

module.exports = router;
