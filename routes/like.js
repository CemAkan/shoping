var express = require("express");
var router = express.Router();
var db = require("../connection");
db.sequelize.sync();

// //--> routes for like <--

// //--> list all items that were added to like list <--
router.get("/list", function (req, res, next) {
  let personId = req.params.id;
  db.Like.findOne({
    where: {
      id: personId,
    },
  }).then(
    (list) => {
      let listofItems = [];
      for (i of list) {
        db.Item.findOne({
          where: {
            id: i,
          },
        }).then(
          (item) => {
            objItem = JSON.parse(item);
            finalList = listofItems.push(objItem.name);
          },
          () => {
            res.status(400).send();
          }
        );
      }
      res.send(listofItems);
    },
    () => {
      res.status(400).send();
    }
  );
}),
  //--> add items to like list<--
  router.post("/add", function (req, res, next) {
    // let personId = req.params.id;
    // let body = _.pick(req.body, "id");
    // db.Like.create(body).then(
    //   (id) => {
    //     res.send("Succefully item " + id + " added to like list.");
    //   },
    //   (err) => {
    //     res.status(400).send({
    //       error: "Please use correct writing rules.",
    //     });
    //   }
    // );
  });

module.exports = router;
