var express = require("express");
var router = express.Router();

//--> List all items <--
router.get("/list", function (req, res, next) {});
//--> Add a item <--
router.post("/add", function (req, res, next) {});
//--> Update a item <--
router.put("/update", function (req, res, next) {});
//--> Delete a item <--
router.delete("/delete", function (req, res, next) {});

module.exports = router;
