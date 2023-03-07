//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { addressModel } = require("../database/database");
const model = require("../services/modelService");

// export variable
module.exports = {
  //--> List all Addresses <--
  listAllAddress: async (req, res, next) => {
    try {
      await model.findAll(addressModel).then((address) => {
        res.json({ status: "success", data: address });
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Add a address <--
  addAddress: async (req, res, next) => {
    try {
      let body = req.body;
      var createdAddress = await model.create(addressModel, body);
      res.json({
        status: "success",
        data: createdAddress,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Update a address <--
  updateAddress: async (req, res, next) => {
    try {
      let ID = req.params.id;
      let body = req.body;
      let condition = {
        where: {
          id: ID,
        },
      };

      var updatedAddress = await model.update(addressModel, body, condition);
      res.json({
        status: "success",
        data: updatedAddress,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Delete a address <--
  deleteAddress: async (req, res, next) => {
    try {
      let addressId = req.params.id;
      var rowdeleted = await model.delete(addressModel, {
        where: {
          id: addressId,
        },
      });

      if (rowdeleted === 0) {
        res.status(404).send({
          error: "Address can not found.",
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
        error: error,
      });
    }
  },
};
