//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { photoModel, sequelize } = require("../database/database");
const model = require("../services/modelService");

// export variable
module.exports = {
  deletePhoto: async (req, res, next) => {
    const photoId = req.params.id;
    try {
      const deletedPhoto = await model.delete(photoModel, {
        where: { id: photoId },
      });

      res.json({ status: "success", data: deletedPhoto });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },
  listPhotoAnnouncement: async (req, res, next) => {
    try {
      let ID = req.params.id;

      let condition = {
        where: {
          announcementId: ID,
        },
      };
      var photo = await model.findOne(photoModel, condition);
      res.json({
        status: "success",
        data: photo,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },
  listPhotoItem: async (req, res, next) => {
    try {
      let ID = req.params.id;

      let condition = {
        where: {
          id: ID,
        },
      };
      var photo = await model.findOne(photoModel, condition);
      res.json({
        status: "success",
        data: photo,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },
};
