//--> Module dependencies <--
var express = require("express");
var router = express.Router();
var db = require("../connection");

//--> routes for cart <--

//--> list all items that were added to cart list<--
router.get("/list/:id", function (req, res, next) {
  let personId = req.params.id;
  db.Cart.findAll({
    where: {
      userId: personId,
    },
  }).then(
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
  db.Cart.findAll({
    where: {
      userId: personId,
    },
  }).then(
    (cart) => {
      let a = 0;
      let total = 0;

      for (i in cart) {
        let itemId = cart[a].itemIds;
        db.Item.findOne({
          where: {
            id: itemId,
          },
        }).then((item) => {
          total = total + item.price;
        });
        a = a + 1;
      }
      res.send(total);
    },
    () => {
      res.status(400).send();
    }
  );
});

// set to variables
var Cart = db.Cart;

//--> add items to cart list<--
router.post("/add/:id", function (req, res, next) {
  let personId = req.params.id;
  let body = req.body;
  db.User.findOne({
    where: {
      id: personId,
    },
  }).then((user) => {
    db.Cart.create(body).then((cart) => {
      user.setCart(cart);
      res.send("Succesfully added.");
    });
  });
});

//exporting
module.exports = router;
