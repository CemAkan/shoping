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
module.exports = {
  //--> list all user <--
  list: async (req, res, next) => {
    try {
      await model.findAll(userModel).then((users) => {
        res.json({ status: "success", data: users });
      });
    } catch (error) {
      res.status(500).send({
        error: error,
      });
    }
  },
  //--> login <--
  signIn: async (req, res, next) => {
    try {
      let body = _.pick(req.body, "username", "password");
      var hash = crypter(body.password);
      var login = await model.findOne(userModel, {
        where: {
          username: body.username,
          password: hash,
        },
      });

      if (login != null) {
        res.send(true);
      } else {
        res.send(false);
      }
    } catch (error) {
      res.status(500).send({
        error: error,
      });
    }
  },

  //--> add a new user <--
  signUp: async (req, res) => {
    try {
      let body = req.body;
      var hash = crypter(body.password);
      body.password = hash;
      var createdUser = await model.create(userModel, body);
      res.json({
        status: "success",
        data: createdUser,
      });
    } catch (error) {
      res.status(500).send({
        error: error.errors[0].message,
      });
    }
  },

  //--> update a user <--
  update: async (req, res, next) => {
    try {
      let body = req.body;
      let condition = {
        where: {
          customerId: body.customerId,
        },
      };

      const foundUser = await model.findOne(userModel, condition);

      var updatedUser = await model.update(foundUser, body);
      res.json({
        status: "success",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).send({
        error: error,
      });
    }
  },

  //--> delete a user <--
  deleting: async (req, res, next) => {
    try {
      let personId = req.params.id;
      var rowdeleted = await model.delete(userModel, {
        where: {
          customerId: personId,
        },
      });

      if (rowdeleted === 0) {
        res.status(404).send({
          error: "User can not found.",
        });
      } else {
        res.json({
          status: "success",
          data: rowdeleted,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error,
      });
    }
  },
};
