//--> Module dependencies <--
var express = require("express");
const { forEach } = require("underscore");
var router = express.Router();
var { cartModel, userModel, itemModel } = require("../database/database");
const checkAuth = require("../middleware/middleware");
const model = require("../services/modelService");

//--> routes for cart <--

module.exports = {
  //--> list all items that were added to cart <--
  list: async (req, res, next) => {
    try {
      let personId = req.params.id;
      var listModel = await model.findAll(cartModel, {
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
  //--> get total price of all items that were added to cart <--
  price: async (req, res, next) => {
    try {
      let personId = req.params.id;
      const cart = await model.findAll(cartModel, {
        where: {
          customerId: personId,
        },
      });
      let total = 0;
      await Promise.all(
        cart.map(async (cartItem) => {
          const item = await model.findOne(itemModel, {
            where: {
              itemId: cartItem.itemIds,
            },
          });
          total += item.price;
        })
      );

      res.json({
        status: "success",
        data: total.toString(),
      });
    } catch (error) {
      res.status(500).send({
        error: error,
      });
    }
  },

  //--> add items to cart list <--
  add: async (req, res, next) => {
    try {
      let body = req.body;

      var created = await model.create(cartModel, body);
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

  //--> update a item in cart <--
  update: async (req, res, next) => {
    try {
      let cartId = req.params.id;
      let body = req.body;
      let condition = {
        where: {
          id: cartId,
        },
      };

      const foundCart = await model.findOne(cartModel, condition);

      var updatedCart = await model.update(foundCart, body);
      res.json({
        status: "success",
        data: updatedCart,
      });
    } catch (error) {
      res.status(500).send({
        error: error,
      });
    }
  },

  //--> delete a item in cart <--
  deleteOne: async (req, res, next) => {
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
      res.status(500).send({
        error: error,
      });
    }
  },

  //delete cart
  deleteAll: async (req, res, next) => {
    try {
      let personId = req.params.id;
      const cart = await model.findAll(cartModel, {
        where: {
          customerId: personId,
        },
      });

      cart.forEach((cartItem) => {
        let itemId = cartItem.id;
        model.delete(cartModel, {
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
