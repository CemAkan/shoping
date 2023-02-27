module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    id: {
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
      type: Sequelize.STRING,
      allowNUll: false,
      validate: {
        len: [8, 100],
      },
    },
  });
};
