//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { likeModel, userModel } = require("../database/database");
const checkAuth = require("../middleware/middleware");
const model = require("../services/modelService");

//--> routes for like <--

// export variable
module.exports = {
  //--> list all items that were added to like list <--
  listAllItems: async (req, res, next) => {
    try {
      let personId = req.params.id;
      var listModel = await model.findAll(likeModel, {
        where: {
          customerId: personId,
        },
      });

      res.json({
        status: "success",
        data: listModel,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> add items to like list<--
  addItem: async (req, res, next) => {
    try {
      let body = req.body;

      var created = await model.create(likeModel, body);
      res.json({
        status: "success",
        data: created,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> delete a item in like list <--
  deleteOneItem: async (req, res, next) => {
    try {
      let ID = req.params.id;
      var rowdeleted = await model.delete(likeModel, {
        where: {
          id: ID,
        },
      });

      if (rowdeleted === 0) {
        res.status(404).send({
          error: "Item in cart can not found.",
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

  //delete like list
  deleteAllItems: async (req, res, next) => {
    try {
      let personId = req.params.id;

      await model.delete(likeModel, {
        where: {
          customerId: personId,
        },
      });

      res.json({
        status: "success",
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },
};
