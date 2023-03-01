//--> Module dependencies.<--
var express = require("express");
var app = express();
var router = express.Router();
var {
  deleting,
  list,
  signIn,
  signUp,
  update,
} = require("../../controllers/userControler");
const checkAuth = require("../../middleware/middleware");
const { user_signUp, updateUser } = require("../../validators/authValidator");

//--> METHODS FOR /user <--

//--> list all user <--
router.get("/list", checkAuth, list);

//--> login <--
router.post("/sign-in", signIn);

//--> add a new user <--
router.post("/sign-up", user_signUp, signUp);

//--> update a user <--
router.put("/update", updateUser, update);

//--> delete a user <--
router.delete("/delete/:id", deleting);

//exporting
module.exports = router;
