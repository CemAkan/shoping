//--> Module dependencies <--
var express = require("express");
var router = express.Router();
var { cartModel, userModel, itemModel } = require("../../database/database");
const checkAuth = require("../../middleware/middleware");
const model = require("../../services/modelService");

//--> routes for cart <--

// export variable
var Carts = {};

//--> list all items that were added to cart list<--
Carts.list = (req, res, next) => {
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
};
//--> get total price of all items that were added to cart list<--
Carts.price = (req, res, next) => {
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
};

//--> add items to cart list <--
Carts.add = (req, res, next) => {
  let personId = req.params.id;
  let body = req.body;
  model
    .findOne(userModel, {
      where: {
        customerId: personId,
      },
    })
    .then(
      (user) => {
        model.create(cartModel, body).then((cart) => {
          user.addcartModels(cart);
          res.send("Succesfully added.");
        });
      },
      (err) => {
        res.status(400).send({
          error: "Please use correct writing rules.",
        });
      }
    );
};

//exporting
module.exports = Carts;
