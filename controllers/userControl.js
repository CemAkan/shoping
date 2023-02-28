//--> Module dependencies.<--
var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var _ = require("underscore");
var { userModel } = require("../database/database");
const checkAuth = require("../middleware/middleware");
const crypter = require("../services/passwordCrypt");
const model = require("../services/modelService");
const userValidator = require("../validators/authValidator");

//--> METHODS FOR /user <--
var users = {};

//--> list all user <--
users.list =
  (checkAuth,
  async (req, res, next) => {
    res.json(await model.findAll(userModel));
  });

//--> login <--
users.signIn = async (req, res, next) => {
  let body = _.pick(req.body, "username", "password");
  var hash = crypter(body.password);
  await model
    .findOne(userModel, {
      where: {
        username: body.username,
        password: hash,
      },
    })
    .then((todos) => {
      if (todos != null) {
        res.send(true);
      } else {
        res.send(false);
      }
    }),
    () => {
      res.status(404).send({
        error: "You can not login, please try again.",
      });
    };
};

//--> add a new user <--
users.signUp =
  (userValidator.signUp,
  (req, res) => {
    let body = req.body;
    var hash = crypter(body.password);
    body.password = hash;

    model.create(userModel, body).then(
      (resign) => {
        res.json(resign);
      },
      (err) => {
        res.status(400).send({
          error: "Please use correct writing rules.",
        });
      }
    );
  });

//--> update a user <--
users.update =
  (userValidator.updateUser,
  (req, res) => {
    let personId = req.params.id;
    let body = _.pick(req.body, "username", "email", "password");
    let attributes = {};

    if (body.hasOwnProperty("username")) {
      attributes.username = body.username;
    }

    if (body.hasOwnProperty("email")) {
      attributes.email = body.email;
    }

    if (body.hasOwnProperty("password")) {
      attributes.password = body.password;
    }

    model
      .findOne(userModel, {
        where: {
          id: personId,
        },
      })
      .then(
        (resign) => {
          if (resign) {
            resign.update(attributes).then(
              (resign) => {
                res.json(resign);
              },
              () => {
                res.status(400).send();
              }
            );
          } else {
            res.status(404).send({
              error: "Person can not found.",
            });
          }
        },
        () => {
          res.status(500).send();
        }
      );
  });

//--> delete a user <--
users.delete = (req, res, next) => {
  let personId = req.params.id;
  model
    .delete(userModel, {
      where: {
        id: personId,
      },
    })
    .then(
      (rowdeleted) => {
        if (rowdeleted === 0) {
          res.status(404).send({
            error: "Person can not found.",
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

//exporting
module.exports = users;
