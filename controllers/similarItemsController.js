//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { similarItemsModel } = require("../database/database");
const checkAuth = require("../middleware/middleware");
const model = require("../services/modelService");

// export variable
module.exports = {
  //--> List all Similar Items: <--
  listAllSimilarItems: async (req, res, next) => {
    try {
      await model.findAll(similarItemsModel).then((similarItems) => {
        res.json({ status: "success", data: similarItems });
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error.message,
      });
    }
  },

  //--> Add a similar Item <--
  addSimilarItems: async (req, res, next) => {
    try {
      let body = req.body;
      var createdSimilarItems = await model.create(similarItemsModel, body);
      res.json({
        status: "success",
        data: createdSimilarItems,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error.message,
      });
    }
  },

  //--> Update a similar Item <--
  updateSimilarItems: async (req, res, next) => {
    try {
      let ID = req.params.id;
      let body = req.body;
      let condition = {
        where: {
          id: ID,
        },
      };

      var updatedSimilarItems = await model.update(
        similarItemsModel,
        body,
        condition
      );
      res.json({
        status: "success",
        data: updatedSimilarItems,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error.message,
      });
    }
  },

  //--> Delete a similar Item <--
  deleteSimilarItems: async (req, res, next) => {
    try {
      let similarItemsId = req.params.id;
      var rowdeleted = await model.delete(similarItemsModel, {
        where: {
          id: similarItemsId,
        },
      });

      if (rowdeleted === 0) {
        res.status(404).send({
          error: "Similar Items  can not found.",
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
