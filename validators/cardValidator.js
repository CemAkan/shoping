var express = require("express");
var app = express();
const validator = require("./validate");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var cardNumberCheck = require("../services/cardNumberCheck");

module.exports = {
  // validation for creating a new card
  createCard: (req, res, next) => {
    const validationRule = {
      cardNumber: "required|integer",
      cardName: "required|string|max:10",
    };

    //--> body variable <--
    let body = req.body;

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "error", data: error });
      } else if (body.cardName.length < 1) {
        res.json({
          status: "error",
          error: "Please use a card name.",
        });
      } else if (!cardNumberCheck(cardNumber)) {
        res.json({
          status: "error",
          error: "Please use a real card number",
        });
      } else {
        next();
      }
    });
  },
  // validation for updating a card
  update_Card: (req, res, next) => {
    const validationRule = {
      cardNumber: "required|integer",
      cardName: "required|string|max:10",
    };

    //--> body variable <--
    let body = req.body;

    validator(req.body, validationRule, {}, (error, status) => {
      if (!status) {
        res.status(422).send({ status: "error", data: error });
      } else if (body.cardName.length < 1) {
        res.json({
          status: "error",
          error: "Please use a card name.",
        });
      } else if (!cardNumberCheck(cardNumber)) {
        res.json({
          status: "error",
          error: "Please use a real card number",
        });
      } else {
        next();
      }
    });
  },
};
