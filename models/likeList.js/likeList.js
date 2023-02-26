module.exports = (sequelize, Sequelize) => {
  return sequelize.define("item", {
    itemIds: {
      type: Sequelize.ENUM,
      allowNUll: true,
    },
  });
};
