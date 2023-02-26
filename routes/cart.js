var express = require("express");
var router = express.Router();
var Item = require("../models/items/item");
var db = require("../connection");
db.sequelize.sync();

//--> routes for cart <--

//--> list all items that were added to cart list<--
router.get("/list", function (req, res, next) {
  let personId = req.params.id;
  db.Cart.findOne({
    where: {
      id: personId,
    },
  }).then(
    (list) => {
      let listofItems = [];
      for (i of list) {
        db.Item.findOne({
          where: {
            id: i,
          },
        }).then(
          (item) => {
            objItem = JSON.parse(item);
            finalList = listofItems.push(objItem.name);
          },
          () => {
            res.status(400).send();
          }
        );
      }
      res.send(listofItems);
    },
    () => {
      res.status(400).send();
    }
  );
});
//--> get total price of all items that were added to cart list<--
router.get("/price", function (req, res, next) {
  let personId = req.params.id;
  db.Cart.findOne({
    where: {
      id: personId,
    },
  }).then(
    (list) => {
      let total = 0;
      for (i of list) {
        db.Item.findOne({
          where: {
            id: i,
          },
        }).then(
          (item) => {
            objItem = JSON.parse(item);
            total = total + objItem.price;
          },
          () => {
            res.status(400).send();
          }
        );
      }
      res.send(total);
    },
    () => {
      res.status(400).send();
    }
  );
});
//--> add items to cart list<--
router.post("/add", function (req, res, next) {});

module.exports = router;
