//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { permissionsModel } = require("../database/database");
const model = require("../services/modelService");

// export variable
module.exports = {
  //--> List all permissions <--
  listAllPermissions: async (req, res, next) => {
    try {
      await model.findAll(permissionsModel).then((permissions) => {
        res.json({ status: "success", data: permissions });
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error.errors[0].message,
      });
    }
  },

  //--> Update a permissions <--
  updatePermissions: async (req, res, next) => {
    try {
      let ID = req.params.id;
      let body = req.body;
      let condition = {
        where: {
          id: ID,
        },
      };

      var updatedpermissions = await model.update(
        permissionsModel,
        body,
        condition
      );
      res.json({
        status: "success",
        data: updatedpermissions,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error.errors[0].message,
      });
    }
  },
};
