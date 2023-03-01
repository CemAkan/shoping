module.exports = (sequelize, Sequelize) => {
  return sequelize.define("cart", {
    itemIds: {
      type: Sequelize.INTEGER,
      allowNUll: true,
    },
  });
};
