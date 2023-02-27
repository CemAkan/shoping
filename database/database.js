//--> Requirements <--
var user = require("../models/user/user");
var cart = require("../models/cart/cart");
var category = require("../models/category/category");
var like = require("../models/likeList/likeList");
var item = require("../models/items/item");
var Database = require("../config/config");

//--> Database Connection <--
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  Database.development.database,
  Database.development.username,
  Database.development.password,
  {
    host: Database.development.host,
    dialect: Database.development.dialect,
  }
);
