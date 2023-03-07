module.exports = (sequelize, Sequelize) => {
  return sequelize.define("similarItem", {
    //simillar item's id
    similarItemId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
