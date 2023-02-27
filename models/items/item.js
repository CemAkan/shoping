module.exports = (sequelize, Sequelize) => {
  return sequelize.define("item", {
    itemId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      readOnly: true,
      autoIncrement: true,
      allowNUll: false,
      unique: true,
      validate: {
        len: [1, 10],
      },
    },
    name: {
      type: Sequelize.STRING,
      allowNUll: false,
      validate: {
        len: [1, 20],
      },
    },
    price: {
      type: Sequelize.INTEGER,
      allowNUll: false,
    },
  });
};
