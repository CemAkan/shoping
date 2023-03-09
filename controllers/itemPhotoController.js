//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var { itemPhotoModel, sequelize } = require("../database/database");
const model = require("../services/modelService");

// export variable
module.exports = {
  addPhoto: async (req, res, next) => {
    // const { photoCategory, isStored } = req.body;
    //const { location, mimetype, size } = req.file;

    const t = await sequelize.transaction();
    var counter = 0;
    try {
      for (const photo of req.files) {
        await modelService.findOrCreate(itemPhotoModel, {
          where: {
            photoLink: photo.location,
            photoType: photo.mimetype,
            photoSize: photo.size,
          },
          defaults: {
            photoLink: photo.location,
            photoType: photo.mimetype,
            photoSize: photo.size,
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
      const deletedPhoto = await modelService.delete(itemPhotoModel, {
        where: { id: photoId },
      });

      res.json({ status: "success", data: deletedPhoto });
    } catch (error) {
      res.status(500).json({ status: "error", data: error });
      next(error);
    }
  },
};
