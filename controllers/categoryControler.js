//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { categoryModel } = require("../database/database");
const checkAuth = require("../middleware/middleware");
const model = require("../services/modelService");

// export variable
module.exports = {
  //--> List all categories <--
  list: async (req, res, next) => {
    await model.findAll(categoryModel).then((categories) => {
      res.json(categories);
    });
  },

  //--> Add a category <--
  add: (req, res, next) => {
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
  },

  //--> Update a category <--
  update: async (req, res, next) => {
    let category_Id = req.params.id;
    let body = req.body;

    let condition = {
      where: {
        categoryId: category_Id,
      },
    };

    const foundCategory = await model.findOne(categoryModel, condition);

    var updatedCategory = await model.update(foundCategory, body);
    res.status(400).send(updatedCategory);
  },

  //--> Delete a category <--
  deleting: (req, res, next) => {
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
  },
};
