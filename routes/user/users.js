//--> Module dependencies.<--
var express = require("express");
var app = express();
var router = express.Router();
var control = require("../../controllers/userControl");

//--> METHODS FOR /user <--

//--> list all user <--
router.get("/list", control.list);

//--> login <--
router.post("/sign-in", control.signIn);

//--> add a new user <--
router.post("/sign-up", control.signUp);

//--> update a user <--
router.put("/update/:id", control.update);

//--> delete a user <--
router.delete("/delete/:id", control.delete);

//exporting
module.exports = router;
