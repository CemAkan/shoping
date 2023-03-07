//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { itemVariantsModel } = require("../database/database");
const model = require("../services/modelService");

// export variable
module.exports = {
  //--> List all ItemVariants <--
  listAllItemVariant: async (req, res, next) => {
    try {
      await model.findAll(itemVariantsModel).then((ItemVariants) => {
        res.json({ status: "success", data: ItemVariants });
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Add a itemVariant <--
  addItemVariant: async (req, res, next) => {
    try {
      let body = req.body;
      var createdItemVariant = await model.create(itemVariantsModel, body);
      res.json({
        status: "success",
        data: createdItemVariant,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Update a itemVariant <--
  updateItemVariant: async (req, res, next) => {
    try {
      let ID = req.params.id;
      let body = req.body;
      let condition = {
        where: {
          id: ID,
        },
      };

      var updatedItemVariant = await model.update(
        itemVariantsModel,
        body,
        condition
      );
      res.json({
        status: "success",
        data: updatedItemVariant,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Delete a itemVariant <--
  deleteItemVariant: async (req, res, next) => {
    try {
      let itemVariantsId = req.params.id;
      var rowdeleted = await model.delete(itemVariantsModel, {
        where: {
          id: itemVariantsId,
        },
      });

      if (rowdeleted === 0) {
        res.status(404).send({
          error: "Item Variant: can not found.",
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
