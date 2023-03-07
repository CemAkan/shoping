//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  addOldOrders,
  listAllOldOrders,
} = require("../../controllers/oldOrdersController");

//--> List all orders <--
router.get("/list", listAllOldOrders);

//--> Add a order <--
router.post("/add", addOldOrders);

module.exports = router;
