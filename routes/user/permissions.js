//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
//controller requirement will comes here

//--> List permissions <--
router.get("/list");

//--> Update a permission <--
router.put("/update/:id");

module.exports = router;
