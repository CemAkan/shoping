//--> Module dependencies.<--
var express = require("express");
var app = express();
var router = express.Router();
var {
  deleteUser,
  signIn,
  signUp,
  update_User,
} = require("../../controllers/userControler");
const checkAuth = require("../../middleware/middleware");
const { user_signUp, updateUser } = require("../../validators/authValidator");

//--> METHODS FOR /user <--

//--> login <--
router.post("/sign-in", signIn);

//--> add a new user <--
router.post("/sign-up", user_signUp, signUp);

//--> update a user <--
router.put("/update/:id", updateUser, update_User);

//--> delete a user <--
router.delete("/delete/:id", deleteUser);

//exporting
module.exports = router;
