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
  listAllAnnouncement,
  deleteAnnouncement,
  addAnnouncement,
  updateAnnouncement,
} = require("../../controllers/announcementController");

//Requests

//--> List all announcements <--
router.get("/list", listAllAnnouncement);

//--> Add a announcement <--
router.post("/add", uploadImageDO.array("photo", 5), addAnnouncement);

//--> Update a announcement <--
router.put("/update/:id", updateAnnouncement);

//--> Delete a announcement <--
router.delete("/delete/:id", deleteAnnouncement);

module.exports = router;
