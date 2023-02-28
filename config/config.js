require("dotenv").config();

//--> Define dotenv variables <--
module.exports = {
  development: {
    username: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DB,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};
