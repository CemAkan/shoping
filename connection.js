require("dotenv").config();

//--> Define dotenv variables <--
var NAME = process.env.NAME;
var DB = process.env.DB;
var DIALECT = process.env.DIALECT;
var HOST = process.env.HOST;
var PASSWORD = process.env.PASSWORD;

//--> Database connection <--
const Sequelize = require("sequelize");
const sequelize = new Sequelize(DB, NAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
});

//--> Define and export db variable <--
var db = {};

db.User = sequelize.import(__dirname + "/models/user/user.js");
db.Cart = sequelize.import(__dirname + "/models/cart/cart.js");
db.Category = sequelize.import(__dirname + "/models/category/category.js");
db.Like = sequelize.import(__dirname + "/models/likeList/likeList.js");
db.Item = sequelize.import(__dirname + "/models/items/item.js");

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
