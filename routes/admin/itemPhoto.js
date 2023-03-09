//--> Module dependencies.<--
var express = require("express");
var uploadImageDO = require("../../services/photoUpload");
var router = express.Router();
var {
  addPhoto,
  deletePhoto,
} = require("../../controllers/itemPhotoController");

//--> Add a photo <--
router.post("/add", uploadImageDO.array("photo", 5), addPhoto);

//--> Delete a photo <--
router.delete("/delete/:id", deletePhoto); //photo id

module.exports = router;
