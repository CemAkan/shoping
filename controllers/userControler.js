//--> Module dependencies.<--
var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var _ = require("underscore");
var { userModel } = require("../database/database");
const crypter = require("../services/passwordCrypt");
const model = require("../services/modelService");

//--> METHODS FOR /user <--

// export variable
var users = {};

//--> list all user <--
users.list = async (req, res, next) => {
  res.json(await model.findAll(userModel));
};

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
users.signUp = (req, res) => {
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
};

//--> update a user <--
users.update = async (req, res) => {
  let personId = req.params.id;
  let body = req.body;
  let condition = {
    where: {
      customerId: personId,
    },
  };

  const foundUser = await model.findOne(userModel, condition);

  var hash = crypter(body.password);
  body.password = hash;

  var updatedProfile = await model.update(foundUser, body);
  res.status(400).send(updatedProfile);
};

//--> delete a user <--
users.delete = (req, res, next) => {
  let personId = req.params.id;
  model
    .delete(userModel, {
      where: {
        customerId: personId,
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
