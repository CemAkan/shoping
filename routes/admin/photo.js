//--> Module dependencies.<--
var express = require("express");
var app = express();
var uploadImageDO = require("../../services/photoUpload");
var router = express.Router();

//body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//controllers
var {
  deletePhoto,
  listPhotoItem,
  listPhotoAnnouncement,
} = require("../../controllers/photoController");

//Requests

//--> Add a photo <--
router.post("/add", uploadImageDO.array("photo", 5), addPhoto);

//--> Delete a photo <--
router.delete("/delete/:id", deletePhoto); //photo id

//--> List a item photo <--
router.get("/list-item/:id", listPhotoItem); //item id

//--> List a announcement photo <--
router.get("/list-annoucement/:id", listPhotoAnnouncement); //announcement id

module.exports = router;
