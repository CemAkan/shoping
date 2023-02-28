//--> Module dependencies.<--
var express = require("express");
var app = express();
var router = express.Router();
var control = require("../../controllers/userControl");
const checkAuth = require("../../middleware/middleware");
const userValidator = require("../../validators/authValidator");

//--> METHODS FOR /user <--

//--> list all user <--
router.get("/list", checkAuth, control.list);

//--> login <--
router.post("/sign-in", control.signIn);

//--> add a new user <--
router.post("/sign-up", userValidator.signUp, control.signUp);

//--> update a user <--
router.put("/update/:id", userValidator.updateUser, control.update);

//--> delete a user <--
router.delete("/delete/:id", control.delete);

//exporting
module.exports = router;
