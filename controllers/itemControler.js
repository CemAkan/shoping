//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { itemModel, photoModel, sequelize } = require("../database/database");
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
        error: error.message,
      });
    }
  },

  //--> Add a item <--
  addItem: async (req, res, next) => {
    try {
      var { name, price, category_Id, description } = req.body;
      var createdItem = await model.create(itemModel, {
        name: name,
        price: price,
        category_Id: category_Id,
        description: description,
      });

      try {
        const t = await sequelize.transaction();

        for (const photo of req.files) {
          await model.findOrCreate(photoModel, {
            where: {
              photoLink: photo.location,
              photoType: photo.mimetype,
              photoSize: photo.size,
              itemId: createdItem.id,
            },
            defaults: {
              photoLink: photo.location,
              photoType: photo.mimetype,
              photoSize: photo.size,
              itemId: createdItem.id,
            },
          });
        }

        await t.commit();
      } catch (error) {
        res.status(422).send({ status: "Error", data: error.message });
        await t.rollback();
      }

      res.json({
        status: "success",
        data: createdItem,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error.message,
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
        error: error.message,
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
        error: error.message,
      });
    }
  },
};
