//--> Module dependencies <--
var express = require("express");
var router = express.Router();
var { cartModel, userModel, itemModel } = require("../database/database");
const checkAuth = require("../middleware/middleware");
const model = require("../services/modelService");

//--> routes for cart <--

module.exports = {
  //--> list all items that were added to cart <--
  listAllItems: async (req, res, next) => {
    try {
      let phone = req.params.phone;
      var listModel = await model.findAll(cartModel, {
        where: {
          phone: phone,
        },
      });

      res.json({
        status: "success",
        number_of_Items: listModel.length,
        data: listModel,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },
  //--> get total price of all items that were added to cart <--
  totalPrice: async (req, res, next) => {
    try {
      const phone = req.params.phone;
      const cart = await model.findAll(cartModel, {
        where: {
          phone: phone,
        },
      });
      let total = 0;

      for (const cartItem of cart) {
        const itemId = cartItem.itemId;
        const items = await model.findOne(itemModel, {
          where: {
            id: itemId,
          },
        });

        total = total + items.price;
      }

      res.json({
        status: "success",
        data: total.toString(),
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> add items to cart list <--
  addItem: async (req, res, next) => {
    try {
      let body = req.body;

      var created = await model.create(cartModel, body);

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

  //--> update a item in cart <--
  updateItem: async (req, res, next) => {
    try {
      let body = req.body;
      let ID = req.params.id;
      let condition = {
        where: {
          id: ID,
        },
      };

      var updatedCart = await model.update(cartModel, body, condition);
      res.json({
        status: "success",
        data: updatedCart,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> delete a item in cart <--
  deleteOneItem: async (req, res, next) => {
    try {
      let cartID = req.params.id;
      var rowdeleted = await model.delete(cartModel, {
        where: {
          id: cartID,
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

  //delete cart
  deleteAllItems: async (req, res, next) => {
    try {
      let phone = req.params.phone;

      await model.delete(cartModel, {
        where: {
          phone: phone,
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
