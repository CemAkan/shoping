//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { deliveryDetailsModel } = require("../database/database");
const model = require("../services/modelService");

// export variable
module.exports = {
  //--> List all deliveryDetails <--
  listAllDeliveryDetails: async (req, res, next) => {
    try {
      await model.findAll(deliveryDetailsModel).then((deliveryDetails) => {
        res.json({ status: "success", data: deliveryDetails });
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Add a deliveryDetail <--
  addDeliveryDetail: async (req, res, next) => {
    try {
      let body = req.body;
      var createdDeliveryDetail = await model.create(
        deliveryDetailsModel,
        body
      );
      res.json({
        status: "success",
        data: createdDeliveryDetail,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Update a deliveryDetail <--
  updateDeliveryDetail: async (req, res, next) => {
    try {
      let ID = req.params.id;
      let body = req.body;
      let condition = {
        where: {
          id: ID,
        },
      };

      var updatedDeliveryDetail = await model.update(
        deliveryDetailsModel,
        body,
        condition
      );
      res.json({
        status: "success",
        data: updatedDeliveryDetail,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Delete a deliveryDetail <--
  deleteDeliveryDetail: async (req, res, next) => {
    try {
      let deliveryDetailsId = req.params.id;
      var rowdeleted = await model.delete(deliveryDetailsModel, {
        where: {
          id: deliveryDetailsId,
        },
      });

      if (rowdeleted === 0) {
        res.status(404).send({
          error: "Delivery Detail can not found.",
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
