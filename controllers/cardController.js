//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { cardModel } = require("../database/database");
const checkAuth = require("../middleware/middleware");
const model = require("../services/modelService");

// export variable
module.exports = {
  //--> List all cards <--
  listAllCard: async (req, res, next) => {
    try {
      let phone = req.params.phone;
      let condition = {
        where: {
          phone: phone,
        },
      };
      await model.findAll(cardModel, condition).then((cards) => {
        res.json({ status: "success", data: cards });
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error.message,
      });
    }
  },

  //--> Add a card <--
  addCard: async (req, res, next) => {
    try {
      let body = req.body;
      var createdCard = await model.create(cardModel, body);
      res.json({
        status: "success",
        data: createdCard,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error.message,
      });
    }
  },

  //--> Update a card <--
  updateCard: async (req, res, next) => {
    try {
      let cardNumber = req.params.cardNumber;
      let body = req.body;
      let condition = {
        where: {
          cardNumber: cardNumber,
        },
      };

      var updatedCard = await model.update(cardModel, body, condition);
      res.json({
        status: "success",
        data: updatedCard,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error.message,
      });
    }
  },

  //--> Delete a card <--
  deleteCard: async (req, res, next) => {
    try {
      let cardNumber = req.params.cardNumber;
      var rowdeleted = await model.delete(cardModel, {
        where: {
          cardNumber: cardNumber,
        },
      });

      if (rowdeleted === 0) {
        res.status(404).send({
          error: "Card can not found.",
        });
      } else {
        res.json({
          status: "success",
          data: rowdeleted,
        });
      }
    } catch (error) {
      res.json({
        status: "error",
        error: error.message,
      });
    }
  },
};
