// Require modules
const aws = require("aws-sdk"),
  { S3 } = require("@aws-sdk/client-s3");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();
const app = express();

const spacesEndpoint = new aws.Endpoint("ams3.digitaloceanspaces.com");
const s3 = new S3({
  region: "eu-west-3",
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_ACCESS_KEY,
  secretAccessKey: process.env.DO_SECRET_ACCESS_KEY,
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

let turkishLetters = {
  ı: "i",
  ö: "o",
  ğ: "g",
  ç: "c",
  ü: "u",
  ş: "s",
  İ: "I",
  Ö: "O",
  Ğ: "G",
  Ç: "C",
  Ü: "U",
  Ş: "S",
  " ": "-",
};

const checkTurkishLetters = (letter) => {
  if (turkishLetters[letter]) {
    return turkishLetters[letter];
  } else return letter;
};

const fileName = (originalname) => {
  let convertedName = "";
  for (let i = 0; i < originalname.length; i++) {
    let letter = checkTurkishLetters(originalname[i]);
    convertedName += letter;
  }
  return convertedName;
};

const uploadDO = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: process.env.DO_BUCKET_NAME,
    acl: "public-read",
    key: function (request, file, cb) {
      let convertedName = Date.now() + "-" + fileName(file.originalname);
      var fullPath = "images/items/" + convertedName;
      cb(null, fullPath);
    },
  }),
});

module.exports = uploadDO;
