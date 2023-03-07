//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  listAllDeliveryDetails,
  deleteDeliveryDetail,
  updateDeliveryDetail,
  addDeliveryDetail,
} = require("../../controllers/deliveryDetailsController");

//--> List all details <--
router.get("/list", listAllDeliveryDetails);

//--> Add a detail <--
router.post("/add", addDeliveryDetail);

//--> Update a detail <--
router.put("/update/:id", updateDeliveryDetail);

//--> Delete a detail <--
router.delete("/delete/:id", deleteDeliveryDetail);

module.exports = router;
