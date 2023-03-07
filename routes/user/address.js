//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
//controller requirement will comes here

//--> List all addresses <--
router.get("/list");

//--> Add a address <--
router.post("/add");

//--> Update a address <--
router.put("/update/:id");

//--> Delete a address <--
router.delete("/delete/:id");

module.exports = router;
