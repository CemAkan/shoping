var express = require("express");
var app = express();
const validator = require("./validate");
const model = require("../services/modelService");
var { userModel } = require("../database/database");
var bodyParser = require("body-parser");
app.use(bodyParser.json());

module.exports = {
  // validation for creating a new user
  signUp: (req, res, next) => {
    const validationRule = {
      username: "required|string",
      email: "required|email",
      password: "required|string|min:8",
    };

    //--> email check and return info to user about it <--i
    let body = req.body;

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "error", data: error });
      } else {
        model
          .findOne(userModel, {
            where: {
              email: body.email,
            },
          })
          .then((person) => {
            if (person != null) {
              res.send("Please use different email.");
            } else {
              next();
            }
          });
      }
    });
  },
  // validation for updating a new user
  updateUser: (req, res, next) => {
    const validationRule = {
      username: "string",
      email: "email",
      password: "string|min:8",
    };

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "error", data: error });
      } else {
        next();
      }
    });
  },
};
