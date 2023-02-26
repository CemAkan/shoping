module.exports = (sequelize, Sequelize) => {
  return sequelize.define("item", {
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
