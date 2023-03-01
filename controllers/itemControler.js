//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { itemModel, categoryModel } = require("../database/database");
const checkAuth = require("../middleware/middleware");
const model = require("../services/modelService");

// export variable
module.exports = {
  //--> List all items <--
  list: async (req, res, next) => {
    try {
      await model.findAll(itemModel).then((items) => {
        res.json({ status: "success", data: items });
      });
    } catch (error) {
      res.status(500).send({
        error: error,
      });
    }
  },

  //--> Add a item <--
  add: async (req, res, next) => {
    try {
      let body = req.body;
      var createdItem = await model.create(itemModel, body);
      res.json({ status: "success", data: createdItem });
    } catch (error) {
      res.status(400).send({
        error: "Category can not found",
      });
    }
  },

  //--> Update a item <--
  update: async (req, res, next) => {
    try {
      let itemId = req.params.id;
      let body = req.body;
      let condition = {
        where: {
          itemId: itemId,
        },
      };

      const foundItem = await model.findOne(itemModel, condition);

      var updatedItem = await model.update(foundItem, body);
      res.json({ status: "success", data: create });
    } catch (error) {
      res.status(500).send({
        error: error,
      });
    }
  },

  //--> Delete a item <--
  deleting: async (req, res, next) => {
    try {
      let itemId = req.params.id;
      var rowdeleted = await model.delete(itemModel, {
        where: {
          itemId: itemId,
        },
      });

      if (rowdeleted === 0) {
        res.status(404).send({
          error: "Item can not found.",
        });
      } else {
        res.json({ status: "success", data: rowdeleted });
      }
    } catch (error) {
      res.status(500).send({
        error: error,
      });
    }
  },
};
