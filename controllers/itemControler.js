//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { itemModel, categoryModel } = require("../database/database");
const checkAuth = require("../middleware/middleware");
const model = require("../services/modelService");

// export variable
module.exports = {
  //--> List all items <--
  listAllItem: async (req, res, next) => {
    try {
      await model.findAll(itemModel).then((items) => {
        res.json({ status: "success", data: items });
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Add a item <--
  addItem: async (req, res, next) => {
    try {
      let body = req.body;
      var createdItem = await model.create(itemModel, body);
      res.json({
        status: "success",
        data: createdItem,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Update a item <--
  updateItem: async (req, res, next) => {
    try {
      let ID = req.params.id;
      let body = req.body;
      let condition = {
        where: {
          id: ID,
        },
      };

      var updatedItem = await model.update(itemModel, body, condition);
      res.json({
        status: "success",
        data: updatedItem,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Delete a item <--
  deleteItem: async (req, res, next) => {
    try {
      let itemId = req.params.id;
      var rowdeleted = await model.delete(itemModel, {
        where: {
          id: itemId,
        },
      });

      if (rowdeleted === 0) {
        res.status(404).send({
          error: "Item can not found.",
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
        error: error,
      });
    }
  },
};
