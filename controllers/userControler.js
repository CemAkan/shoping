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
  listAllUsers: async (req, res, next) => {
    try {
      await model.findAll(userModel).then((users) => {
        res.json({ status: "success", data: users });
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error.errors[0].message,
      });
    }
  },
  //--> login <--
  signIn: async (req, res, next) => {
    try {
      let body = _.pick(req.body, "phone", "password");
      var hash = crypter(body.password);
      var login = await model.findOne(userModel, {
        where: {
          phone: body.phone,
          password: hash,
        },
      });

      if (login != null) {
        res.json({
          status: "success",
        });
      } else {
        res.json({
          status: "error",
        });
      }
    } catch (error) {
      res.json({
        status: "error",
        error: error.errors[0].message,
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
      res.json({
        status: "error",
        error: error.errors[0].message,
      });
    }
  },

  //--> update a user <--
  update_User: async (req, res, next) => {
    try {
      let body = req.body;
      var hash = crypter(body.password);
      body.password = hash;
      let ID = req.params.id;
      let condition = {
        where: {
          id: ID,
        },
      };

      var updatedUser = await model.update(userModel, body, condition);
      res.json({
        status: "success",
        data: updatedUser,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error.errors[0].message,
      });
    }
  },

  //--> delete a user <--
  deleteUser: async (req, res, next) => {
    try {
      let personId = req.params.id;
      var rowdeleted = await model.delete(userModel, {
        where: {
          id: personId,
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
      res.json({
        status: "error",
        error: error.errors[0].message,
      });
    }
  },
};
