//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  listAllItems,
  deleteAllItems,
  deleteOneItem,
  updateItem,
  addItem,
} = require("../../controllers/likeControler");
//--> routes for like <--

//--> list all items that were added to like list <--
router.get("/list/:id", listAllItems);

//--> add items to like list<--
router.post("/add", addItem);

//--> update a item in like list <--
router.put("/update", updateItem); //id = id

//--> delete a item in like list <--
router.delete("/delete-one/:id", deleteOneItem); //id = id

//--> delete like list <--
router.delete("/delete-all/:id", deleteAllItems); //id = customerId

//exporting
module.exports = router;
