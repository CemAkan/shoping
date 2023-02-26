var express = require("express");
var router = express.Router();
var db = require("../connection");

db.sequelize.sync();

//--> List all items <--
router.get("/list", function (req, res, next) {
  db.Item.findAll().then((items) => {
    res.json(items);
  });
});
//--> Add a item <--
router.post("/add", function (req, res, next) {
  let body = _.pick(req.body, "name", "price");

  db.Item.create(body).then(
    (item) => {
      res.json(item);
    },
    (err) => {
      res.status(400).send({
        error: "Please use correct writing rules.",
      });
    }
  );
});
//--> Update a item <--
router.put("/update", function (req, res, next) {
  let itemId = req.params.id;
  let body = _.pick(req.body, "name", "price");
  let attributes = {};

  if (body.hasOwnProperty("name")) {
    attributes.name = body.name;
  }

  if (body.hasOwnProperty("price")) {
    attributes.price = body.price;
  }

  db.Item.findOne({
    where: {
      id: itemId,
    },
  }).then(
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
router.delete("/delete", function (req, res, next) {
  let itemId = req.params.id;
  db.Item.destroy({
    where: {
      id: itemId,
    },
  }).then(
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
