//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  listAllAddress,
  addAddress,
  deleteAddress,
  updateAddress,
} = require("../../controllers/addressController");

//--> List all addresses <--
router.get("/list", listAllAddress);

//--> Add a address <--
router.post("/add", addAddress);

//--> Update a address <--
router.put("/update/:id", updateAddress);

//--> Delete a address <--
router.delete("/delete/:id", deleteAddress);

module.exports = router;
