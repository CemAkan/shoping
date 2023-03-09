//--> Module dependencies.<--
var express = require("express");
var router = express.Router();

//--> Add a photo <--
router.post("/add", uploadDO.array("file", 10), (req, res) => {
  res.send("Files successfuly upload!");
});

module.exports = router;
