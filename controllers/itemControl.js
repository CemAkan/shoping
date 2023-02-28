//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { itemModel, categoryModel } = require("../database/database");
const checkAuth = require("../middleware/middleware");
const model = require("../services/modelService");

// export variable
var Item = {};

//--> List all items <--
Item.list = async (req, res, next) => {
  await model.findAll(itemModel).then((items) => {
    res.json(items);
  });
};

//--> Add a item <--
Item.add = (req, res, next) => {
  let category_Id = req.params.id;
  let body = req.body;
  model
    .findOne(categoryModel, {
      where: {
        categoryId: category_Id,
      },
    })
    .then(
      (category) => {
        model
          .create(itemModel, {
            name: body.name,
            price: body.price,
            categoryId: category_Id,
          })
          .then((item) => {
            category.additemModels(item);
            res.send(body.name + " succesfully added.");
          });
      },
      (err) => {
        res.status(400).send({
          error: "Please use correct writing rules.",
        });
      }
    );
};

//--> Update a item <--
Item.update = async (req, res, next) => {
  let itemId = req.params.id;
  let body = req.body;
  let condition = {
    where: {
      itemId: itemId,
    },
  };

  const foundItem = await model.findOne(itemModel, condition);

  var updatedItem = await model.update(foundItem, body);
  res.status(400).send(updatedItem);
};

//--> Delete a item <--
Item.delete = (req, res, next) => {
  let itemId = req.params.id;
  model
    .delete(itemModel, {
      where: {
        itemId: itemId,
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

module.exports = Item;
