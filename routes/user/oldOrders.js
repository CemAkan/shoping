//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
//controller requirement will comes here

//--> List all orders <--
router.get("/list");

//--> Add a order <--
router.post("/add");

module.exports = router;
