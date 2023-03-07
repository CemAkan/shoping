//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  listAllPermissions,
  updatePermissions,
} = require("../../controllers/permissionsController");

//--> List permissions <--
router.get("/list", listAllPermissions);

//--> Update a permission <--
router.put("/update/:id", updatePermissions);

module.exports = router;
