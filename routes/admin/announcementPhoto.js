//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  addPhoto,

  deletePhoto,
} = require("../../controllers/announcementPhotoController");

//--> Add a photo <--
router.post("/add", addPhoto);

//--> Delete a photo <--
router.delete("/delete/:id", deletePhoto); //photo id

module.exports = router;
