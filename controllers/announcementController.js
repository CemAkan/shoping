//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  announcementsModel,
  photoModel,
  sequelize,
} = require("../database/database");
const model = require("../services/modelService");
var uploadImageDO = require("../services/photoUpload");

// export variable
module.exports = {
  //--> List all announcements <--
  listAllAnnouncement: async (req, res, next) => {
    try {
      await model.findAll(announcementsModel).then((announcements) => {
        res.json({ status: "success", data: announcements });
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Add a announcement <--
  addAnnouncement: async (req, res, next) => {
    try {
      let body = req.body;
      var createdAnnouncement = await model.create(announcementsModel, {
        details: body.details,
        itemId: body.itemId,
      });

      body.announcementId = createdAnnouncement.id;

      try {
        const t = await sequelize.transaction();

        for (const photo of req.files) {
          await model.findOrCreate(photoModel, {
            where: {
              photoLink: photo.location,
              photoType: photo.mimetype,
              photoSize: photo.size,
              announcementId: req.body.announcementId,
            },
            defaults: {
              photoLink: photo.location,
              photoType: photo.mimetype,
              photoSize: photo.size,
              announcementId: req.body.announcementId,
            },
          });
        }

        await t.commit();
      } catch (error) {
        res.status(422).send({ status: "Error", data: error.message });
        await t.rollback();
      }

      res.json({
        status: "success",
        data: createdAnnouncement,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error.message,
      });
    }
  },

  //--> Update a announcement <--
  updateAnnouncement: async (req, res, next) => {
    try {
      let ID = req.params.id;
      let body = req.body;
      let condition = {
        where: {
          id: ID,
        },
      };

      var updatedAnnouncement = await model.update(
        announcementsModel,
        body,
        condition
      );
      res.json({
        status: "success",
        data: updatedAnnouncement,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
      });
    }
  },

  //--> Delete a announcement <--
  deleteAnnouncement: async (req, res, next) => {
    try {
      let announcementId = req.params.id;
      var rowdeleted = await model.delete(announcementsModel, {
        where: {
          id: announcementId,
        },
      });

      if (rowdeleted === 0) {
        res.status(404).send({
          error: "Announcement can not found.",
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
