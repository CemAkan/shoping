//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  listAllItems,
  deleteAllItems,
  deleteOneItem,
  addItem,
} = require("../../controllers/likeControler");
//--> routes for like <--

//--> list all items that were added to like list <--
router.get("/list/:phone", listAllItems);

//--> add items to like list<--
router.post("/add", addItem);

//--> delete a item in like list <--
router.delete("/delete-one/:id", deleteOneItem); //id = id

//--> delete like list <--
router.delete("/delete-all/:phone", deleteAllItems); //id = customerId

//exporting
module.exports = router;
