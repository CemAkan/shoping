//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var db = require("../../database/database");
const checkAuth = require("../../middleware/middleware");

//--> routes for like <--

//--> list all items that were added to like list <--
router.get("/list/:id", function (req, res, next) {
  let personId = req.params.id;
  db.likeModel
    .findAll({
      where: {
        customerId: personId,
      },
    })
    .then(
      (list) => {
        let a = 0;
        let listofLike = [];
        for (i in list) {
          listofLike.push(list[a].itemIds);
          a = a + 1;
        }
        res.send(listofLike);
      },
      () => {
        res.status(400).send();
      }
    );
});

// set to variables
var Like = db.Like;

//--> add items to like list<--
router.post("/add/:id", function (req, res, next) {
  let personId = req.params.id;
  let body = req.body;
  db.userModel
    .findOne({
      where: {
        customerId: personId,
      },
    })
    .then(
      (user) => {
        db.likeModel.create(body).then((like) => {
          user.addLikes(like);
          res.send("Succesfully added.");
        });
      },
      (err) => {
        res.status(400).send({
          error: "Please use correct writing rules.",
        });
      }
    );
});

//exporting
module.exports = router;
