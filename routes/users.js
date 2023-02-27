//--> Module dependencies.<--
var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var _ = require("underscore");
const crypto = require("crypto");
var db = require("../connection");

// --> cyrpto <--
const hashAlgo = "sha256";

//--> METHODS FOR /user <--

//--> list all user <--
router.get("/list", function (req, res, next) {
  db.User.findAll().then((resign) => {
    res.json(resign);
  });
});

//--> login <--
router.post("/sign-in", function (req, res, next) {
  let body = _.pick(req.body, "username", "password");

  //--> part of encrypting the password <--

  const text = body.password;
  const hash = crypto.createHash(hashAlgo).update(text).digest("hex");
  db.User.findOne({
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

// set to variables
var Like = db.Like;
var Cart = db.Cart;

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
    db.User.create(body).then(
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

  db.User.findOne({
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
router.delete("/delete/:id", function (req, res, next) {
  let personId = req.params.id;
  db.User.destroy({
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

//exporting
module.exports = router;
