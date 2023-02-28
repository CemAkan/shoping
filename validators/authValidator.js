var express = require("express");
var app = express();
const validator = require("./validate");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var emailCheck = require("../services/emailUniqueCheck");
var passwordCheck = require("../services/passwordCheck");

module.exports = {
  // validation for creating a new user
  signUp: (req, res, next) => {
    const validationRule = {
      username: "required|string|max:10",
      email: "required|email",
      password: "required|string|min:8",
    };

    //--> body variable <--
    let body = req.body;

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "error", data: error });
      } else if (body.username < 1) {
        res.status(422).send("Please use a username.");
      } else if (passwordCheck(body.password) == 1) {
        res.status(422).send("Please use lower case in your password.");
      } else if (passwordCheck(body.password) == 2) {
        res.status(422).send("Please use capitals in your password.");
      } else if (passwordCheck(body.password) == 3) {
        res.status(422).send("Please use number in your password.");
      } else if (passwordCheck(body.password) == 4) {
        res.status(422).send("Please use symbols in your password.");
      } else {
        next();
      }
    });
  },
  // validation for updating a new user
  updateUser: (req, res, next) => {
    const validationRule = {
      username: "string|max:10",
      email: "email",
      password: "string|min:8",
    };

    //--> body variable <--
    let body = req.body;

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "error", data: error });
      } else if (body.username < 1) {
        res.status(422).send("Please use a username.");
      } else if (passwordCheck(body.password) == 1) {
        res.status(422).send("Please use lower case in your password.");
      } else if (passwordCheck(body.password) == 2) {
        res.status(422).send("Please use capitals in your password.");
      } else if (passwordCheck(body.password) == 3) {
        res.status(422).send("Please use number in your password.");
      } else if (passwordCheck(body.password) == 4) {
        res.status(422).send("Please use symbols in your password.");
      } else {
        next();
      }
    });
  },
};
