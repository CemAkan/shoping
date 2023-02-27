//--> Module dependencies <--
var express = require("express");
var router = express.Router();
var db = require("../database/database");

//--> routes for cart <--

//--> list all items that were added to cart list<--
router.get("/list/:id", function (req, res, next) {
  let personId = req.params.id;
  db.cartModel
    .findAll({
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
});
//--> get total price of all items that were added to cart list<--
router.get("/price/:id", function (req, res, next) {
  let personId = req.params.id;
  db.cartModel
    .findAll({
      where: {
        customerId: personId,
      },
    })
    .then((cart) => {
      let total = 0;
      let promises = [];

      cart.forEach((cartItem) => {
        let itemId = cartItem.itemIds;
        let promise = db.itemModel
          .findOne({
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
});

// set to variables
var Cart = db.cartModel;

//--> add items to cart list <--
router.post("/add/:id", function (req, res, next) {
  let personId = req.params.id;
  let body = req.body;
  db.userModel
    .findOne({
      where: {
        customerId: personId,
      },
    })
    .then(
      (user) => {
        db.cartModel.create(body).then((cart) => {
          user.addCarts(cart);
          res.send("Succesfully added.");
        });
      },
      (err) => {
        res.status(400).send({
          error: "Please use correct writing rules.",
        });
      }
    );
});

//exporting
module.exports = router;
