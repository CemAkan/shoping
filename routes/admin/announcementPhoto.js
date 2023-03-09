//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var uploadDO = require("../../services/photoUpload");
var {
  addPhoto,

  deletePhoto,
} = require("../../controllers/announcementPhotoController");

//--> Add a photo <--
router.post("/add", uploadDO.array("file", 10), addPhoto);

//--> Delete a photo <--
router.delete("/delete/:id", deletePhoto); //photo id

module.exports = router;
