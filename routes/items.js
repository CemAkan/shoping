//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var db = require("../database/database");
const checkAuth = require("../middleware/middleware");

//--> List all items <--
router.get("/list", function (req, res, next) {
  db.Item.findAll().then((items) => {
    res.json(items);
  });
});

// set to variable
var Item = db.itemModel;

//--> Add a item <--
router.post("/add/:id", function (req, res, next) {
  let category_Id = req.params.id;
  let body = req.body;
  db.categoryModel
    .findOne({
      where: {
        categoryId: category_Id,
      },
    })
    .then(
      (category) => {
        db.itemModel
          .create({
            name: body.name,
            price: body.price,
            categoryId: category_Id,
          })
          .then((item) => {
            category.addItems(item);
            res.send(body.name + " succesfully added.");
          });
      },
      (err) => {
        res.status(400).send({
          error: "Please use correct writing rules.",
        });
      }
    );
});

//--> Update a item <--
router.put("/update/:id", function (req, res, next) {
  let itemId = req.params.id;
  let body = _.pick(req.body, "name", "price");
  let attributes = {};

  if (body.hasOwnProperty("name")) {
    attributes.name = body.name;
  }

  if (body.hasOwnProperty("price")) {
    attributes.price = body.price;
  }

  db.itemModel
    .findOne({
      where: {
        id: itemId,
      },
    })
    .then(
      (item) => {
        if (item) {
          item.update(attributes).then(
            (finalItem) => {
              res.json(finalItem);
            },
            () => {
              res.status(400).send();
            }
          );
        } else {
          res.status(404).send({
            error: "Item can not found.",
          });
        }
      },
      () => {
        res.status(500).send();
      }
    );
});

//--> Delete a item <--
router.delete("/delete/:id", function (req, res, next) {
  let itemId = req.params.id;
  db.itemModel
    .destroy({
      where: {
        id: itemId,
      },
    })
    .then(
      (rowdeleted) => {
        if (rowdeleted === 0) {
          res.status(404).send({
            error: "Item can not found.",
          });
        } else {
          res.status(204).send();
        }
      },
      () => {
        res.status(500).send();
      }
    );
});

module.exports = router;
