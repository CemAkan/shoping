const { userRoleTypes } = require("../../helpers/roleTypes");

module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    //user's phone number for primary key
    phone: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    //user's username
    username: {
      type: Sequelize.STRING,
      allowNUll: false,
      validate: {
        len: [1, 10],
      },
    },
    //user's email address
    email: {
      type: Sequelize.STRING,
      allowNUll: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    //user's password
    password: {
      type: Sequelize.STRING(64),
      validate: {
        is: /^[0-9a-f]{64}$/i,
      },
    },
    //user's role
    role: {
      type: Sequelize.STRING,
      defaultValue: userRoleTypes.user,
    },
    //access token for accessing toadmin routes
    access_token: {
      type: Sequelize.STRING,
    },
    //activity status for user
    account_activity_status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    //user's gender
    gender: {
      type: Sequelize.ENUM("M", "F", "Other"),
      allowNull: false,
    },
  });
};
