//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  list,
  update,
  add,
  deleteAll,
  deleteOne,
} = require("../../controllers/likeControler");
//--> routes for like <--

//--> list all items that were added to like list <--
router.get("/list/:id", list);

//--> add items to like list<--
router.post("/add", add);

//--> update a item in like list <--
router.put("/update", update); //id = id

//--> delete a item in like list <--
router.delete("/delete-one/:id", deleteOne); //id = id

//--> delete like list <--
router.delete("/delete-all/:id", deleteAll); //id = customerId

//exporting
module.exports = router;
