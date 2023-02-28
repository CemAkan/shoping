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

//--> update a item in like list <--
like.update = async (req, res, next) => {
  let likeID = req.params.id;
  let body = req.body;
  let condition = {
    where: {
      id: likeID,
    },
  };

  const foundLike = await model.findOne(likeModel, condition);

  var updatedLike = await model.update(foundLike, body);
  res.status(400).send(updatedLike);
};

//--> delete a item in like list <--
like.deleteOne = (req, res, next) => {
  let likeID = req.params.id;
  model
    .delete(likeModel, {
      where: {
        id: likeID,
      },
    })
    .then(
      (rowdeleted) => {
        if (rowdeleted === 0) {
          res.status(404).send({
            error: "Item in like list can not found.",
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

//delete like list
like.deleteAll = (req, res, next) => {
  let personID = req.params.id;
  let condition = {
    where: {
      customerId: personID,
    },
  };

  model.findAll(likeModel, condition).then((likes) => {
    likes.forEach((like) => {
      model.delete(likeModel, like).then((success) => {
        res.send("Like list was successfully deleted.");
      });
    });
  });
};

//exporting
module.exports = like;
