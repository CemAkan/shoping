//--> Module dependencies.<--
var express = require("express");
var app = express();
var router = express.Router();
var { listAllUsers } = require("../../controllers/userControler");
const checkAuth = require("../../middleware/middleware");

//--> list all user <--
router.get("/", listAllUsers);

//exporting
module.exports = router;
