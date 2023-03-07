//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  listAllAnnouncement,
  deleteAnnouncement,
  addAnnouncement,
  updateAnnouncement,
} = require("../../controllers/announcementController");

//--> List all announcements <--
router.get("/list", listAllAnnouncement);

//--> Add a announcement <--
router.post("/add", addAnnouncement);

//--> Update a announcement <--
router.put("/update/:id", updateAnnouncement);

//--> Delete a announcement <--
router.delete("/delete/:id", deleteAnnouncement);

module.exports = router;
