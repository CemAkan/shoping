//--> Module dependencies.<--

//main module requirements
var express = require("express");
//router requirements
var router = express.Router();
//models requirements
var { photoModel, sequelize } = require("../database/database");
//service requirements
const model = require("../services/modelService");

// export variable
module.exports = {
  addPhoto: async (req, res, next) => {
    const t = await sequelize.transaction();
    var counter = 0;
    try {
      for (const photo of req.files) {
        if (!req.body.itemId) {
          req.body.itemId = null;
        }
        if (!req.body.announcementId) {
          req.body.req.body.announcementId = null;
        }

        await model.findOrCreate(photoModel, {
          where: {
            photoLink: photo.location,
            photoType: photo.mimetype,
            photoSize: photo.size,
            announcementId: req.body.announcementId,
            itemId: req.body.itemId,
          },
          defaults: {
            photoLink: photo.location,
            photoType: photo.mimetype,
            photoSize: photo.size,
            announcementId: req.body.announcementId,
            itemId: req.body.itemId,
          },
        });
        counter++;
      }

      await t.commit();

      res.json({
        status: "success",
        data: counter + " new photos were added.",
      });
    } catch (error) {
      res.status(422).send({ status: "Error", data: error.message });
      await t.rollback();
      next(error);
    }
  },

  deletePhoto: async (req, res, next) => {
    const photoId = req.params.id;
    try {
      const deletedPhoto = await model.delete(photoModel, {
        where: { id: photoId },
      });

      res.json({ status: "success", data: deletedPhoto });
    } catch (error) {
      res.status(500).json({ status: "error", data: error.message });
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
        error: error.message,
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
        error: error.message,
      });
    }
  },
};
