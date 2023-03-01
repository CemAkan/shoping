//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var like = require("../../controllers/likeControler");
//--> routes for like <--

//--> list all items that were added to like list <--
router.get("/list/:id", like.list);

//--> add items to like list<--
router.post("/add/:id", like.add);

//--> update a item in like list <--
router.put("/update/:id", like.update); //id = id

//--> delete a item in like list <--
router.delete("/delete-one/:id", like.deleteOne); //id = id

//--> delete like list <--
router.delete("/delete-all/:id", like.deleteAll); //id = customerId

//exporting
module.exports = router;
