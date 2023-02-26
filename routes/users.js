var express = require("express");
var router = express.Router();

//--> routes for user <--

//--> list all user <--
router.get("/list", function (req, res, next) {});
//--> login <--
router.post("/sign-in", function (req, res, next) {});
//--> add a new user <--
router.post("/sign-up", function (req, res, next) {});
//--> update a user <--
router.put("/update", function (req, res, next) {});
//--> delete a user <--
router.delete("/delete", function (req, res, next) {});

module.exports = router;
