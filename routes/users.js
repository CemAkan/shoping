var express = require("express");
var app = express();
var router = express.Router();
var User = require("../models/user/user");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var _ = require("underscore");
const crypto = require("crypto");

// --> cyrpto <--
const hashAlgo = "sha256";

//--> routes for user <--

//--> list all user <--
router.get("/list", function (req, res, next) {
  app.get("/users/list", (req, res) => {
    User.findAll().then((resign) => {
      res.json(resign);
    });
  });
});

//--> login <--
router.post("/sign-in", function (req, res, next) {
  let body = _.pick(req.body, "username", "password");

  //--> part of encrypting the password <--
  const text = body.password;
  const hash = crypto.createHash(hashAlgo).update(text).digest("hex");
  User.findOne({
    where: {
      username: body.username,
      password: hash,
    },
    //--> login chech <--
  }).then((todos) => {
    if (todos != null) {
      res.send("You succesfully logined.");
    } else {
      res.send("You can not login, please try again.");
    }
  }),
    () => {
      res.status(404).send({
        error: "You can not login, please try again.",
      });
    };
});

//--> add a new user <--
router.post("/sign-up", function (req, res, next) {
  let body = _.pick(req.body, "username", "email", "password");

  //--> part of encrypting the password <--
  const text = body.password;
  const hash = crypto.createHash(hashAlgo).update(text).digest("hex");
  body.password = hash;
  //--> password length check <--
  if (text.length < 8) {
    res.send("Please use a long password.");
  } else {
    User.create(body).then(
      (resign) => {
        res.json(resign);
      },
      (err) => {
        res.status(400).send({
          error: "Please use correct writing rules.",
        });
      }
    );
  }
});

//--> update a user <--
router.put("/update", function (req, res, next) {
  let personId = req.params.id;
  let body = _.pick(req.body, "username", "email", "password");
  let attributes = {};

  if (body.hasOwnProperty("username")) {
    attributes.username = body.username;
  }

  if (body.hasOwnProperty("email")) {
    attributes.email = body.email;
  }

  if (body.hasOwnProperty("password")) {
    attributes.password = body.password;
  }

  User.findOne({
    where: {
      id: personId,
    },
  }).then(
    (resign) => {
      if (resign) {
        resign.update(attributes).then(
          (resign) => {
            res.json(resign);
          },
          () => {
            res.status(400).send();
          }
        );
      } else {
        res.status(404).send({
          error: "Person can not found.",
        });
      }
    },
    () => {
      res.status(500).send();
    }
  );
});

//--> delete a user <--
router.delete("/delete", function (req, res, next) {
  let personId = req.params.id;
  User.destroy({
    where: {
      id: personId,
    },
  }).then(
    (rowdeleted) => {
      if (rowdeleted === 0) {
        res.status(404).send({
          error: "Person can not found.",
        });
      } else {
        res.status(204).send();
      }
    },
    () => {
      res.status(500).send();
    }
  );
});

module.exports = router;
