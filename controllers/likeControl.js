//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { likeModel, userModel } = require("../database/database");
const checkAuth = require("../middleware/middleware");
const model = require("../services/modelService");

//--> routes for like <--

// export variable
var like = {};

//--> list all items that were added to like list <--
like.list = (req, res, next) => {
  let personId = req.params.id;
  model
    .findAll(likeModel, {
      where: {
        customerId: personId,
      },
    })
    .then(
      (list) => {
        let a = 0;
        let listofLike = [];
        for (i in list) {
          listofLike.push(list[a].itemIds);
          a = a + 1;
        }
        res.send(listofLike);
      },
      () => {
        res.status(400).send();
      }
    );
};

//--> add items to like list<--
like.add = (req, res, next) => {
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
        model.create(likeModel, body).then((like) => {
          user.addlikeModels(like);
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
module.exports = like;