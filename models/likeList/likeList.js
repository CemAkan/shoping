module.exports = (sequelize, Sequelize) => {
  return sequelize.define("like", {
    itemIds: {
      type: Sequelize.STRING,
      allowNUll: true,
    },
  });
};
