//--> Module dependencies.<--
var express = require("express");
var router = express.Router();
var {
  listAllCard,
  addCard,
  deleteCard,
  updateCard,
} = require("../../controllers/cardController");
const { createCard, update_Card } = require("../../validators/cardValidator");

//--> List all cards <--
router.get("/list/:phone", listAllCard);

//--> Add a card <--
router.post("/add", createCard, addCard);

//--> Update a card <--
router.put("/update/:cardNumber", update_Card, updateCard);

//--> Delete a card <--
router.delete("/delete/:cardNumber", deleteCard);

module.exports = router;
