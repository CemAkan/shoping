module.exports = (sequelize, Sequelize) => {
  return sequelize.define("item", {
    //name of item
    name: {
      type: Sequelize.STRING,
      allowNUll: false,
      validate: {
        len: [1, 20],
      },
    },
    //price of item
    price: {
      type: Sequelize.FLOAT,
      allowNUll: false,
    },
  });
};
