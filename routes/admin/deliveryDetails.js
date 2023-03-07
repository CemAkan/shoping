//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
//controller requirement will comes here

//--> List all details <--
router.get("/list");

//--> Add a detail <--
router.post("/add");

//--> Update a detail <--
router.put("/update/:id");

//--> Delete a detail <--
router.delete("/delete/:id");

module.exports = router;
