//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { categoryModel } = require("../database/database");
const checkAuth = require("../middleware/middleware");
const model = require("../services/modelService");

// export variable
module.exports = {
  //--> List all categories <--
  listAllCategory: async (req, res, next) => {
    try {
      await model.findAll(categoryModel).then((categories) => {
        res.json({ status: "success", data: categories });
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Add a category <--
  addCategory: async (req, res, next) => {
    try {
      let body = req.body;
      var createdCategory = await model.create(categoryModel, body);
      res.json({
        status: "success",
        data: createdCategory,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Update a category <--
  updateCategory: async (req, res, next) => {
    try {
      let ID = req.params.id;
      let body = req.body;
      let condition = {
        where: {
          categoryId: ID,
        },
      };

      var updatedCategory = await model.update(categoryModel, body, condition);
      res.json({
        status: "success",
        data: updatedCategory,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Delete a category <--
  deleteCategory: async (req, res, next) => {
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
      res.json({
        status: "error",
        error: error,
      });
    }
  },
};
