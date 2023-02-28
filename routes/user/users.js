//--> Module dependencies.<--
var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var _ = require("underscore");
var db = require("../../database/database");
const checkAuth = require("../../middleware/middleware");
const crypter = require("../../services/passwordCrypt/passwordCrypt");

//--> METHODS FOR /user <--

//--> list all user <--
router.get("/list", checkAuth, function (req, res, next) {
  db.userModel.findAll().then((resign) => {
    res.json(resign);
  });
});

//--> login <--
router.post("/sign-in", function (req, res, next) {
  let body = _.pick(req.body, "username", "password");

  var hash = crypter(body.password);
  db.userModel
    .findOne({
      where: {
        username: body.username,
        password: hash,
      },
      //--> login chech <--
    })
    .then((todos) => {
      if (todos != null) {
        res.send(true);
      } else {
        res.send(false);
      }
    }),
    () => {
      res.status(404).send({
        error: "You can not login, please try again.",
      });
    };
});

// set to variables
var Like = db.Like;
var Cart = db.Cart;

//--> add a new user <--
router.post("/sign-up", function (req, res, next) {
  let body = req.body;
  var hash = crypter(body.password);
  body.password = hash;
  //--> password length check <--
  if (body.password.length < 8) {
    res.send("Please use a long password.");
  } else {
    db.userModel.create(body).then(
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
router.put("/update/:id", function (req, res, next) {
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

  db.userModel
    .findOne({
      where: {
        id: personId,
      },
    })
    .then(
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
router.delete("/delete/:id", function (req, res, next) {
  let personId = req.params.id;
  db.userModel
    .destroy({
      where: {
        id: personId,
      },
    })
    .then(
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

//exporting
module.exports = router;
