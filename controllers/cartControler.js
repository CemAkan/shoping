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
  list: (req, res, next) => {
    let personId = req.params.id;
    model
      .findAll(cartModel, {
        where: {
          customerId: personId,
        },
      })
      .then(
        (cart) => {
          let a = 0;
          let listofCart = [];
          for (i in cart) {
            listofCart.push(cart[a].itemIds);
            a = a + 1;
          }
          res.send(listofCart);
        },
        () => {
          res.status(400).send();
        }
      );
  },
  //--> get total price of all items that were added to cart <--
  price: (req, res, next) => {
    let personId = req.params.id;
    model
      .findAll(cartModel, {
        where: {
          customerId: personId,
        },
      })
      .then((cart) => {
        let total = 0;
        let promises = [];

        cart.forEach((cartItem) => {
          let itemId = cartItem.itemIds;
          let promise = model
            .findOne(itemModel, {
              where: {
                itemId: itemId,
              },
            })
            .then((item) => {
              total = total + item.price;
            });
          promises.push(promise);
        });

        Promise.all(promises).then(() => {
          res.send(total.toString());
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send();
      });
  },

  //--> add items to cart list <--
  add: (req, res, next) => {
    let body = req.body;

    model.create(cartModel, body).then(
      (create) => {
        res.send(create);
      },
      (err) => {
        res.status(400).send({
          error: "User can not found",
        });
      }
    );
  },

  //--> update a item in cart <--
  update: async (req, res, next) => {
    let cartId = req.params.id;
    let body = req.body;
    let condition = {
      where: {
        id: cartId,
      },
    };

    const foundCart = await model.findOne(cartModel, condition);

    var updatedCart = await model.update(foundCart, body);
    res.status(400).send(updatedCart);
  },

  //--> delete a item in cart <--
  deleteOne: (req, res, next) => {
    let cartID = req.params.id;
    model
      .delete(cartModel, {
        where: {
          id: cartID,
        },
      })
      .then(
        (rowdeleted) => {
          if (rowdeleted === 0) {
            res.status(404).send({
              error: "Item in cart can not found.",
            });
          } else {
            res.status(204).send();
          }
        },
        () => {
          res.status(500).send();
        }
      );
  },

  //delete cart
  deleteAll: (req, res, next) => {
    let personId = req.params.id;
    model
      .findAll(cartModel, {
        where: {
          customerId: personId,
        },
      })
      .then((cart) => {
        let total = 0;
        let promises = [];

        cart.forEach((cartItem) => {
          let itemId = cartItem.id;
          let promise = model
            .delete(cartModel, {
              where: {
                id: itemId,
              },
            })
            .then((item) => {
              total = total + 1;
            });
          promises.push(promise);
        });

        Promise.all(promises).then(() => {
          res.send(total.toString());
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send();
      });
  },
};
