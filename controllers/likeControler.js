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
  list: async (req, res, next) => {
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
      res.status(500).send({
        error: error,
      });
    }
  },

  //--> add items to like list<--
  add: async (req, res, next) => {
    try {
      let body = req.body;

      var created = await model.create(likeModel, body);
      res.json({
        status: "success",
        data: created,
      });
    } catch (error) {
      res.status(400).send({
        error: "User can not found",
      });
    }
  },

  //--> update a item in like list <--
  update: async (req, res, next) => {
    try {
      let body = req.body;
      let condition = {
        where: {
          id: body.id,
        },
      };

      const foundLike = await model.findOne(likeModel, condition);

      var updatedLike = await model.update(foundLike, body);
      res.json({
        status: "success",
        data: updatedLike,
      });
    } catch (error) {
      res.status(500).send({
        error: error,
      });
    }
  },

  //--> delete a item in like list <--
  deleteOne: async (req, res, next) => {
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
      res.status(500).send({
        error: error,
      });
    }
  },

  //delete like list
  deleteAll: async (req, res, next) => {
    try {
      let personId = req.params.id;
      const like = await model.findAll(likeModel, {
        where: {
          customerId: personId,
        },
      });

      like.forEach((cartItem) => {
        let itemId = cartItem.id;
        model.delete(likeModel, {
          where: {
            id: itemId,
          },
        });
      });

      res.json({
        status: "success",
      });
    } catch (error) {
      res.status(500).send({
        error: error,
      });
    }
  },
};
