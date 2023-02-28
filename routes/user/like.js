//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var like = require("../../controllers/likeControl");
//--> routes for like <--

//--> list all items that were added to like list <--
router.get("/list/:id", like.list);

//--> add items to like list<--
router.post("/add/:id", like.add);

//exporting
module.exports = router;
