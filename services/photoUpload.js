// Require modules
const aws = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();

const app = express();

const spacesEndpoint = new aws.Endpoint(process.env.ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_ACCESS_KEY,
  secretAccessKey: process.env.DO_SECRET_ACCESS_KEY,
});

console.log(process.env.spacesEndpoint);

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

module.exports = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: process.env.DO_BUCKET_NAME,
    acl: "public-read",
    key: function (request, file, cb) {
      let convertedName = "cem";
      var fullPath = "images/" + convertedName;
      cb(null, fullPath);
    },
  }),
});
