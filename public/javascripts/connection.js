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
