//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { announcementsModel } = require("../database/database");
const model = require("../services/modelService");

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
      var createdAnnouncement = await model.create(announcementsModel, body);
      res.json({
        status: "success",
        data: createdAnnouncement,
      });
    } catch (error) {
      res.json({
        status: "error",
        error: error,
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
