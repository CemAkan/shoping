//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var db = require("../connection");

//--> List all categories <--
router.get("/list", function (req, res, next) {
  db.Category.findAll().then((categories) => {
    res.json(categories);
  });
});

//--> Add a category <--
router.post("/add", function (req, res, next) {
  let body = req.body;

  db.Category.create(body).then(
    (category) => {
      res.json(category);
    },
    (err) => {
      res.status(400).send({
        error: "Please use correct writing rules.",
      });
    }
  );
});

//--> Update a category <--
router.put("/update/:id", function (req, res, next) {
  let category_Id = req.params.id;
  let body = req.body;
  let attributes = {};

  if (body.hasOwnProperty("name")) {
    attributes.name = body.name;
  }

  db.Category.findOne({
    where: {
      categoryId: category_Id,
    },
  }).then(
    (category) => {
      if (category) {
        category.update(attributes).then(
          (category) => {
            res.json(category);
          },
          () => {
            res.status(400).send();
          }
        );
      } else {
        res.status(404).send({
          error: "Category can not found.",
        });
      }
    },
    () => {
      res.status(500).send();
    }
  );
});

//--> Delete a category <--
router.delete("/delete/:id", function (req, res, next) {
  let category_Id = req.params.id;
  db.Category.destroy({
    where: {
      categoryId: category_Id,
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
