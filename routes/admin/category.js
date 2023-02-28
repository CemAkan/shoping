//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var Category = require("../../controllers/categoryControl");

//--> List all categories <--
router.get("/list", Category.list);

//--> Add a category <--
router.post("/add", Category.add);

//--> Update a category <--
router.put("/update/:id", Category.update);

//--> Delete a category <--
router.delete("/delete/:id", Category.delete);

module.exports = router;
