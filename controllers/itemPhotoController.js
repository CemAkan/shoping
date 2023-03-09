//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { itemPhotoModel, sequelize } = require("../database/database");
const model = require("../services/modelService");
var uploadDO = require("../services/photoUpload");

// export variable
module.exports = {
  //--> Add a photo <--
  addPhoto: async (req, res, next) => {
    try {
      uploadDO.array("file", 10);
      let body = req.body;
      var createdPhoto = await model.create(itemPhotoModel, body);
      res.json({
        status: "success",
        data: createdPhoto,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error.message,
      });
    }
  },

  //--> Delete a photo <--
  deletePhoto: async (req, res, next) => {
    try {
      let photoId = req.params.id;
      var rowdeleted = await model.delete(itemPhotoModel, {
        where: {
          id: photoId,
        },
      });

      if (rowdeleted === 0) {
        res.status(404).send({
          error: "Photo can not found.",
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
