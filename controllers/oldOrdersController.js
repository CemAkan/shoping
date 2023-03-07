//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { oldOrdersModel } = require("../database/database");
const model = require("../services/modelService");

// export variable
module.exports = {
  //--> List all OldOrders <--
  listAllOldOrders: async (req, res, next) => {
    try {
      await model.findAll(oldOrdersModel).then((oldOrders) => {
        res.json({ status: "success", data: oldOrders });
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Add a oldOrders <--
  addOldOrders: async (req, res, next) => {
    try {
      let body = req.body;
      var createdOldOrders = await model.create(oldOrdersModel, body);
      res.json({
        status: "success",
        data: createdOldOrders,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },
};
