//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var db = require("../connection");

//--> associations <--

//like
db.User.hasOne(db.Like, { foreignKey: "costumerId" });
db.Like.belongsTo(db.User, { foreignKey: "costumerId" });

//--> routes for like <--

//--> list all items that were added to like list <--
router.get("/list/:id", function (req, res, next) {
  let personId = req.params.id;
  db.Like.findAll({
    where: {
      userId: personId,
    },
  }).then(
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
  db.User.findOne({
    where: {
      id: personId,
    },
  }).then((user) => {
    db.Like.create(body).then((like) => {
      user.setLike(like);
      res.send("Succesfully added.");
    });
  });
});

//exporting
module.exports = router;
