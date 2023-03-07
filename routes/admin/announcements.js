//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
//controller requirement will comes here

//--> List all announcements <--
router.get("/list");

//--> Add a announcement <--
router.post("/add");

//--> Update a announcement <--
router.put("/update/:id");

//--> Delete a announcement <--
router.delete("/delete/:id");

module.exports = router;
