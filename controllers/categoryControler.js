//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { categoryModel } = require("../database/database");
const checkAuth = require("../middleware/middleware");
const model = require("../services/modelService");

// export variable
module.exports = {
  //--> List all categories <--
  list: async (req, res, next) => {
    try {
      await model.findAll(categoryModel).then((categories) => {
        res.json({ status: "success", data: categories });
      });
    } catch (error) {
      res.status(500).send({
        error: error,
      });
    }
  },

  //--> Add a category <--
  add: async (req, res, next) => {
    try {
      let body = req.body;
      var createdCategory = await model.create(categoryModel, body);
      res.json({
        status: "success",
        data: createdCategory,
      });
    } catch (error) {
      res.status(400).send({
        error: "Category can not found",
      });
    }
  },

  //--> Update a category <--
  update: async (req, res, next) => {
    try {
      let body = req.body;
      let condition = {
        where: {
          categoryId: body.id,
        },
      };

      const foundCategory = await model.findOne(categoryModel, condition);

      var updatedCategory = await model.update(foundCategory, body);
      res.json({
        status: "success",
        data: updatedCategory,
      });
    } catch (error) {
      res.status(500).send({
        error: error,
      });
    }
  },

  //--> Delete a category <--
  deleting: async (req, res, next) => {
    try {
      let categoryId = req.params.id;
      var rowdeleted = await model.delete(categoryModel, {
        where: {
          categoryId: categoryId,
        },
      });

      if (rowdeleted === 0) {
        res.status(404).send({
          error: "Category can not found.",
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
};
