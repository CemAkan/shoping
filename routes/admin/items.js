//--> Module dependencies.<--
var express = require("express");
var app = express();
var router = express.Router();
var uploadImageDO = require("../../services/photoUpload");

//body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//controllers
var {
  addItem,
  listAllItem,
  updateItem,
  deleteItem,
} = require("../../controllers/itemControler");

//Requests

//--> List all items <--
router.get("/list", listAllItem);

//--> Add a item <--
router.post("/add", uploadImageDO.array("photo", 5), addItem);

//--> Update a item <--
router.put("/update/:id", updateItem);

//--> Delete a item <--
router.delete("/delete/:id", deleteItem);

module.exports = router;
