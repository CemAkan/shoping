const { userRoleTypes } = require("../../helpers/roleTypes");

module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    customerId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      readOnly: true,
      allowNUll: false,
      unique: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNUll: false,
      validate: {
        len: [1, 10],
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNUll: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING(64),
      validate: {
        is: /^[0-9a-f]{64}$/i,
      },
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: userRoleTypes.user,
    },
    access_token: {
      type: Sequelize.STRING,
    },
    account_activity_status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });
};
