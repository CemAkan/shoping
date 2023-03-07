module.exports = (sequelize, Sequelize) => {
  return sequelize.define("itemVariant", {
    //simillar item's id
    itemVariantId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
