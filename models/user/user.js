module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    costumerId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      readOnly: true,
      allowNUll: false,
      unique: true,
      validate: {
        len: [1, 10],
      },
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
      type: Sequelize.STRING,
      allowNUll: false,
      validate: {
        len: [8, 100],
      },
    },
  });
};
