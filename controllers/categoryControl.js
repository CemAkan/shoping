//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { categoryModel } = require("../database/database");
const checkAuth = require("../middleware/middleware");
const model = require("../services/modelService");

// export variable
var Category = {};

//--> List all categories <--
Category.list = async (req, res, next) => {
  await model.findAll(categoryModel).then((categories) => {
    res.json(categories);
  });
};

//--> Add a category <--
Category.add = (req, res, next) => {
  let body = req.body;

  model.create(categoryModel, body).then(
    (category) => {
      res.json(category);
    },
    (err) => {
      res.status(400).send({
        error: "Please use correct writing rules.",
      });
    }
  );
};

//--> Update a category <--
Category.update = (req, res, next) => {
  let category_Id = req.params.id;
  let body = req.body;
  let attributes = {};

  if (body.hasOwnProperty("name")) {
    attributes.name = body.name;
  }

  model
    .findOne(categoryModel, {
      where: {
        categoryId: category_Id,
      },
    })
    .then(
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
};

//--> Delete a category <--
Category.delete = (req, res, next) => {
  let category_Id = req.params.id;
  model
    .delete(categoryModel, {
      where: {
        categoryId: category_Id,
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
};

module.exports = Category;
